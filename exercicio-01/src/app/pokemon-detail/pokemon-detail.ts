import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokenodeStore } from '../pokenode.store';
import { Pokemon } from 'pokenode-ts';
import { map, Observable } from 'rxjs';
import { PokenodeService } from '../pokenode.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css',
  imports: [AsyncPipe],
  providers: [PokenodeStore, PokenodeService]
})

export class PokemonDetail implements OnInit {
  public pokemonObservable$: Observable<Pokemon> | undefined;

  constructor(private activatedRoute: ActivatedRoute, private pokenodeStore: PokenodeStore) { }

  ngOnInit(): void {
    let param;
    this.activatedRoute.params.subscribe(params => param = String(params['id']));

    if (param) {
      this.pokemonObservable$ = this.pokenodeStore.getPokemonDetails(param);
    }
  }
}
