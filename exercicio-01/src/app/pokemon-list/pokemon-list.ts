import { Component } from '@angular/core';
import { AppService } from '../app.service';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common'
import { NamedAPIResource, NamedAPIResourceList } from 'pokenode-ts';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css',
  imports: [CommonModule],
  providers: [AppService],
})
export class PokemonList {
  public pokemonList$: Observable<NamedAPIResource[]>;

  constructor(
    public appService: AppService, public router: Router
  ) {
    // perfeito!
    // como proximo passo, vamos acessar a lista atraves da pokenode-store que vamos criar
    // Como regra: todo acesso a dados deve ser feito atraves do store 
    // e nunca diretamente pelo componente

    // componentes angulares devem ser "burros", ou seja, não devem conter lógica de negócio
    // eles apenas exibem dados e emitem eventos para o usuário interagir
    this.pokemonList$ = appService.getPokemonList().pipe(map(pokemon => pokemon.results));
  }

  goToDetail(pokemon: NamedAPIResource) {

    let splitedUrl = pokemon?.url?.split('/');
    let id: string;

    if (splitedUrl.length > 0) {
      id = splitedUrl[splitedUrl?.length - 2];
    } else {
      return;
    }

    //if (((id ?? '').length) > 0) {
    if (id?.length) {
      this.router.navigate(['pokemon-detail', id]);
    }
  }
}
