
import { Injectable, InjectionToken } from '@angular/core';
import { NamedAPIResourceList, Pokemon } from 'pokenode-ts';
import { Observable } from 'rxjs';
import { PokenodeService } from './pokenode.service';

export const DATA_URL = new InjectionToken('DATA_URL');

export interface Entity {
    id?: number;
}

@Injectable()
export class PokenodeStore {
    private pokemonList$?: Observable<NamedAPIResourceList>;
    private pokemonDetails: Map<string, Observable<Pokemon>> = new Map();


    constructor(private pokenodeService: PokenodeService) { }

    getPokemonList() {
        if (!this.pokemonList$) {
            this.pokemonList$ = this.pokenodeService.getPokemonListFromApi();
        }
        return this.pokemonList$;
    }

    getPokemonDetails(id: string) {
        if (!this.pokemonDetails.has(id)) {
            this.pokemonDetails.set(id, this.pokenodeService.getPokemonDetailsFromApi(id));
        }
        return this.pokemonDetails.get(id);
    }

}
