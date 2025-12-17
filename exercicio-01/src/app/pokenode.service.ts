import { Injectable } from '@angular/core';
import { NamedAPIResourceList, Pokemon } from 'pokenode-ts'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn:"root"
})
export class PokenodeService {
    protected API_URL = 'https://pokeapi.co/api/v2';

    constructor(private _http: HttpClient) {}

    getPokemonListFromApi() : Observable <NamedAPIResourceList> {
        let coiso= this._http.get<NamedAPIResourceList>(this.API_URL + '/pokemon');
        return coiso;
    }

    getPokemonDetailsFromApi(id: string) : Observable<Pokemon> {
        return this._http.get<Pokemon>(this.API_URL + '/pokemon/' + id);
    }
}
