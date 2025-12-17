
import { Injectable, InjectionToken } from '@angular/core';
import { NamedAPIResource, Pokemon } from 'pokenode-ts';
import { BehaviorSubject, catchError, EMPTY, filter, map, Observable, of, switchMap, tap } from 'rxjs';
import { PokenodeService } from './pokenode.service';

export const DATA_URL = new InjectionToken('DATA_URL');

export interface Entity {
    id?: number;
}

@Injectable(
    {
        providedIn: "root",
    }
)
export class PokenodeStore {
    private pokemonListSub = new BehaviorSubject<NamedAPIResource[]>([]);
    public pokemonList$ = this.pokemonListSub.asObservable().pipe(switchMap(pokemonlist => {
        if (!pokemonlist) {
            this.getPokemonList();
        }
        return of(pokemonlist);
    }));

    private pokemonDetailsMapSub = new BehaviorSubject<Map<string, Pokemon>>(new Map());
    private pokemonDetailsSub = new BehaviorSubject<Pokemon>(undefined);
    public pokemonDetails$ = this.pokemonDetailsSub.asObservable();

    constructor(private pokenodeService: PokenodeService) {
        this.getPokemonList();
    }

    getPokemonList() {
        this.pokenodeService.getPokemonListFromApi().pipe(tap(namedAPIResourceList => this.pokemonListSub.next(namedAPIResourceList.results))).subscribe();
    }

    public getPokemonDetails(id: string) {
        this.pokemonDetailsMapSub.pipe(
            map(pokemonMap => {
                // verifica se existe em memória e retorna se houver
                return pokemonMap.get(id);
            }),
            switchMap(cachedPokemon => {
                if (!cachedPokemon) {
                    // senão busca da api getPokemonDetailsFromApi
                    return this.pokenodeService.getPokemonDetailsFromApi(id);
                }
                return of(cachedPokemon);//é necessário cumprir o contrato e retornar observável, neste caso, retorna EMPTY que tb é observável
            }),
            catchError(err => of(undefined)),
            filter(pokemon => !!pokemon),
            tap(detail => {
                this.pokemonDetailsSub.next(detail);
                const currentMap = this.pokemonDetailsMapSub.getValue();
                currentMap.set(id, detail);
                this.pokemonDetailsMapSub.next(currentMap);
            })

        ).subscribe();
    }
}
