
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
    private pokemonListSub = new BehaviorSubject<NamedAPIResource[]>([]);
    pokemonList$ = this.pokemonListSub.asObservable().pipe(switchMap(pokemonlist => {
        if (!pokemonlist) {
            this.getPokemonList();
        }
        return of(pokemonlist);
    }));


    constructor(private pokenodeService: PokenodeService) {
        this.getPokemonList();
    }

    getPokemonList() {
        this.pokenodeService.getPokemonListFromApi().pipe(tap(namedAPIResourceList => this.pokemonListSub.next(namedAPIResourceList.results))).subscribe();
    }


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
