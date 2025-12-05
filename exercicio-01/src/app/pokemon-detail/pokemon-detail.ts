import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app.service';
import { Pokemon } from 'pokenode-ts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css',
  providers: [AppService],
})

export class PokemonDetail {
  private pokemonObservable$?: Observable<Pokemon>;
  public pokemonDetails?: Pokemon;

  // construtores no angular servem apenas para injeção de dependências, 
  // e toda lógica deve ser feita no ngOnInit ou em outros métodos da classe.
  // nesse caso, utilize o ngOnInit para fazer a inscrição nos parâmetros da rota
  constructor(activatedRoute: ActivatedRoute, appService: AppService) {
    // existem varias maneiras de fazer isso, mas a mais simples é usar o pipe do Rxjs
    // ficaria algo como activatedRoute.params.pipe(
    //    switchMap(params => appService.getPokemonDetails(params['id']))
    // ).subscribe(pokemon => this.pokemonDetails = pokemon); 

    // podemos fazer de outra forma usando o pipe async no template
    // ao invés de fazer a inscrição aqui, apenas atribuímos o Observable a uma variável pública  
    // e usamos o pipe async no template para fazer a inscrição e exibir os dados
    activatedRoute.params.subscribe(params => this.pokemonObservable$=appService.getPokemonDetails(params['id']));
    this.pokemonObservable$?.subscribe(pokemon=>this.pokemonDetails=pokemon);
  }
}
