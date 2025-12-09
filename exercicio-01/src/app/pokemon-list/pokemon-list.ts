import { Component, OnInit } from '@angular/core';
import { PokenodeStore } from '../pokenode.store';
import { map, Observable } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common'
import { NamedAPIResource } from 'pokenode-ts';
import { Router } from '@angular/router';
import { PokenodeService } from '../pokenode.service';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.css',
  imports: [CommonModule,AsyncPipe],
  providers: [PokenodeStore,PokenodeService]
})
export class PokemonList implements OnInit {
  public pokemonList$ = new Observable<NamedAPIResource[]>();

  constructor(private pokenodeStore: PokenodeStore, private router: Router) {}

  ngOnInit(): void {
    this.pokemonList$ = this.pokenodeStore.getPokemonList().pipe(map(pokemon=>pokemon.results));
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
