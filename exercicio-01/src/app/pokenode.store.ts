
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

    private pokemonDetailsMapSub: Map<string, BehaviorSubject<Pokemon>>=new Map();

    constructor(private pokenodeService: PokenodeService) {
        this.getPokemonList();
    }

    getPokemonList() {
        this.pokenodeService.getPokemonListFromApi().pipe(tap(namedAPIResourceList => this.pokemonListSub.next(namedAPIResourceList.results))).subscribe();
    }

    getPokemonDetails(id: string): Observable<Pokemon> {
        if (!this.pokemonDetailsMapSub.has(id)) {
            let coisa: BehaviorSubject<Pokemon | null> = new BehaviorSubject(null);

            this.pokenodeService.getPokemonDetailsFromApi(id).pipe(tap(detail => coisa.next(detail))).subscribe();

            this.pokemonDetailsMapSub.set(id, coisa);
        }

        return this.pokemonDetailsMapSub.get(id).asObservable();
    }
}
