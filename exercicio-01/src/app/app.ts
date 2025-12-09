//import { AsyncPipe, CurrencyPipe, JsonPipe } from '@angular/common';
//import { Component, signal } from '@angular/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
//import { PokemonClient } from 'pokenode-ts';
//import { BehaviorSubject, combineLatest, concatMap, delay, from, map, of, startWith, Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],//, AsyncPipe, JsonPipe, CurrencyPipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  //    protected readonly title = signal('exercicio-01');

  //    public fromArray$ = from([1, 2, 3, 4, 5]).pipe(
  //      map((v) => v * 10),
  //      delay(5000)
  //    );

  //    public fromArrayRealDelay$ = from([1,2,3,4,5]).pipe(
  //    concatMap((v, i) => of(v).pipe(delay(i * 1000))),  //0s, 5s, 10s, ...
  //    map(v => v * 10)
  //  );

  //    public subje$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  //    public object = { a: 1, b: 2, c: 3 };

  //    public valor: number = 0;

  constructor(public router: Router) {


    //  this.title.set(this.title() + 'coiso');
    //  this.title.update(cenas=>cenas= 'coiso');


    //    const api = new PokemonClient();
    //    api
    //    .getPokemonByName('luxray')
    //    .then((data) => console.log(data)) // will output "Luxray"
    //    .catch((error) => console.error(error));

    //    const array = [1, 2, 3, 4, 5];

    //    const obs = array.map((num) => of(num).pipe(delay(1000 * num), startWith(0)));

    //    const comb = combineLatest(obs);

    //    setTimeout(() => {
    //      console.log('--- Subscribing now');
    //      comb.subscribe((values) => {
    //        console.log(values, '--- second Values');
    //      });
    //    }, 2000);

    //    comb.subscribe((values) => {
    //        console.log(values, '--- first Values');
    //    });


    //    of(array).pipe(
    //      delay(1000),
    //    )
    //    .subscribe((value) => {
    //      console.log(value, '--- of Values');
    //    });

    //    from(array).pipe(
    //      delay(1000),
    //    )
    //    .subscribe((value) => {
    //      console.log(value, '--- from Values');
    //    });

    //    this.fromArray$.subscribe((value) => {
    //      this.valor = value;
    //    });

    //    this.subje$.next(10);
  }


  goToList() {
    this.router.navigate(['pokemon-list']);
  }
}
