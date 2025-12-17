import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PokenodeStore } from '../pokenode.store';
import { Pokemon } from 'pokenode-ts';
import {Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

interface PokemonParams extends Params {
  id?: string,
}

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css',
  imports: [AsyncPipe]
})

export class PokemonDetail implements OnInit {
  public pokemon$: Observable<Pokemon>=this.pokenodeStore.pokemonDetails$;

  constructor(private activatedRoute: ActivatedRoute, private pokenodeStore: PokenodeStore) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: PokemonParams) => {

      if (params.id) {
        this.pokenodeStore.getPokemonDetails(params.id);
      }
    });
  }
}
