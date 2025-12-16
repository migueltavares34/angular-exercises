
import { Injectable, InjectionToken } from '@angular/core';
import { NamedAPIResource, Pokemon } from 'pokenode-ts';
import { BehaviorSubject, map, Observable, of, switchMap, tap } from 'rxjs';
import { PokenodeService } from './pokenode.service';

export const DATA_URL = new InjectionToken('DATA_URL');

export interface Entity {
    id?: number;
}

@Injectable()
export class PokenodeStore {
    private pokemonListSub = new BehaviorSubject<NamedAPIResource[]>([]);
    public pokemonList$ = this.pokemonListSub.asObservable().pipe(switchMap(pokemonlist => {
        if (!pokemonlist) {
            this.getPokemonList();
        }
        return of(pokemonlist);
    }));

    private pokemonDetailsMapSub = new BehaviorSubject<Map<string, Pokemon>>(new Map());

    constructor(private pokenodeService: PokenodeService) {
        this.getPokemonList();
    }

    getPokemonList() {
        this.pokenodeService.getPokemonListFromApi().pipe(tap(namedAPIResourceList => this.pokemonListSub.next(namedAPIResourceList.results))).subscribe();
    }

    public getPokemonDetails(id: string) : Observable<Pokemon>{
        return this.pokemonDetailsMapSub.pipe(
            map((map) => {
                // verifica se existe em memória e retorna se houver
                if (map.has(id)) {
                    return map.get(id);
                }
                return undefined;
            }),
            tap((cachedPokemon) => {
                if (!!cachedPokemon) {
                    return of(cachedPokemon);
                } else {
                    // senão busca da api getPokemonDetailsFromApi
                    const pokemonDetail = this.pokenodeService.getPokemonDetailsFromApi(id).pipe(
                        tap((detail) => {
                            const currentMap = this.pokemonDetailsMapSub.getValue();
                            currentMap.set(id, detail);
                            this.pokemonDetailsMapSub.next(currentMap);
                        })
                    );
                    pokemonDetail.subscribe();
                    return pokemonDetail;
                }
            })
        );
    }
}
