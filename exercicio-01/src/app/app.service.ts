import { HttpClient } from '@angular/common/http';
import { Injectable, InjectionToken } from '@angular/core';
import { NamedAPIResourceList, Pokemon } from 'pokenode-ts';
import { Observable } from 'rxjs';

export const DATA_URL = new InjectionToken('DATA_URL');

export interface Entity {
    id?: number;
}

// existem 2 tipos de serviços no angular:
// 1. serviços que fornecem dados (data services)
// 2. serviços que fornecem funcionalidades (utility services)
// esse serviço é um data service, pois fornece dados da API do pokeapi.co

// precisamos criar outro serviço para fornecer funcionalidades, como por exemplo, formatação de strings, manipulação de datas, etc.
// esse serviço de utilidades pode ser injetado em qualquer componente ou serviço que precise dessas funcionalidades.   
// e ele conterá um state global da aplicação, se necessário.
// toda vez que precisarmos de um dado da API, devemos criar um método nesse serviço para buscar esse dado localmente em cache.
// e se ele não estiver em cache, buscar na API e armazenar em cache para futuras requisições. 

// renomeie esse servico para pokenode-service.ts e o outro se chamará pokenode-store.ts
@Injectable()
export class AppService {
    protected API_URL = 'https://pokeapi.co/api/v2';

    constructor(
        protected _http: HttpClient,
    ) {
    }

    getPokemonList() {
        return this._http.get<NamedAPIResourceList>(this.API_URL + '/pokemon');
    }

    getPokemonDetails(id: string) {
        return this._http.get<Pokemon>(this.API_URL + '/pokemon/' + id);
    }
}
