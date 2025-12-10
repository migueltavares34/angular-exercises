
import { Injectable, InjectionToken } from '@angular/core';
import { NamedAPIResource, NamedAPIResourceList, Pokemon } from 'pokenode-ts';
import { BehaviorSubject, map, Observable, shareReplay, Subject, tap } from 'rxjs';
import { PokenodeService } from './pokenode.service';

export const DATA_URL = new InjectionToken('DATA_URL');

export interface Entity {
    id?: number;
}

@Injectable()
export class PokenodeStore {
    private pokemonList$ = new BehaviorSubject<NamedAPIResource[]>([]);
    cache$ = this.pokemonList$.asObservable();

    private pokemonDetailsMap: Map<string, BehaviorSubject<Pokemon>> = new Map();


    constructor(private pokenodeService: PokenodeService) { }

    getPokemonList(): Observable<NamedAPIResource[]> {
        if (this.pokemonList$.value.length === 0) {
            this.pokenodeService.getPokemonListFromApi().pipe(tap(lista => this.pokemonList$.next(lista.results))).subscribe();
        }
        return this.cache$;
    }

    getPokemonDetails(id: string): Observable<Pokemon> {
        if (!this.pokemonDetailsMap.has(id)) {
            let coisa: BehaviorSubject<Pokemon | null> = new BehaviorSubject(null);

            this.pokenodeService.getPokemonDetailsFromApi(id).pipe(tap(detail => coisa.next(detail))).subscribe();

            this.pokemonDetailsMap.set(id, coisa);
        }

        return this.pokemonDetailsMap.get(id).asObservable();
    }
}
