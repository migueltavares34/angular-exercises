import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PokenodeStore } from '../pokenode.store';
import { Pokemon } from 'pokenode-ts';
import { combineLatest, map, Observable, of } from 'rxjs';
import { PokenodeService } from '../pokenode.service';
import { AsyncPipe } from '@angular/common';

interface PokemonParams extends Params {
  id?: string,
}

@Component({
  selector: 'app-pokemon-detail',
  standalone: true,
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.css',
  imports: [AsyncPipe],
  providers: [PokenodeStore, PokenodeService]
})

export class PokemonDetail implements OnInit {
  private params: PokemonParams = null;
  private paramsId$ = of(this.params);
  public pokemonObservable$ = combineLatest([this.pokenodeStore.pokemonDetailsMap$, this.paramsId$]).pipe(map(([pokemonMap, paramsId]) => pokemonMap.get(paramsId?.id)));

  constructor(private activatedRoute: ActivatedRoute, private pokenodeStore: PokenodeStore) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: PokemonParams) => {

      if (params.id) {
        this.params = params;
        this.pokenodeStore.getPokemonDetails(params.id);
      }
    });
  }
}
