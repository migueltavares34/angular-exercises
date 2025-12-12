
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

    private pokemonDetailsMap: Map<string, BehaviorSubject<Pokemon>> = new Map();

    private pokemonDetailsMapSub: BehaviorSubject<Map<string, Pokemon>> = new BehaviorSubject(null);
    public pokemonDetailsMap$ = this.pokemonDetailsMapSub.asObservable();

    constructor(private pokenodeService: PokenodeService) {
        this.getPokemonList();
    }

    getPokemonList() {
        this.pokenodeService.getPokemonListFromApi().pipe(tap(namedAPIResourceList => this.pokemonListSub.next(namedAPIResourceList.results))).subscribe();
    }

    getPokemonDetails(id: string): Observable<Pokemon> {
        if (!this.pokemonDetailsMap.has(id)) {
            let coisa: BehaviorSubject<Pokemon | null> = new BehaviorSubject(null);

            this.pokenodeService.getPokemonDetailsFromApi(id).pipe(tap(detail => coisa.next(detail))).subscribe();

            this.pokemonDetailsMap.set(id, coisa);
        }

        return this.pokemonDetailsMap.get(id).asObservable();
    }
    putIdOnMap(id: string) {
        this.pokemonDetailsMapSub.value.set(id, null);
    }
    getPokemonNewDetails(id: string) {
        this.pokenodeService.getPokemonDetailsFromApi(id).pipe(tap(detail => this.pokemonDetailsMapSub.next(this.pokemonDetailsMapSub.value.set(id, detail)))).subscribe();
    }
}
