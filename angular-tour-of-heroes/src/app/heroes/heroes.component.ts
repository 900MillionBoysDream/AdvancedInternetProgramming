import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  /*hero: Hero = {
    id: 1,
    name: 'Windstorm'
  };*/
  //selectedHero: Hero;
  heroes: Hero[];

  //hero = 'Windstorm';
  constructor(private heroService: HeroService) { }

  ngOnInit() {
  this.getHeroes();
  }

  getHeroes(): void {
  this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);
  }

 /* getHeroes(): void {
  this.heroes = this.heroService.getHeroes();
  }*/

  /*onSelect(hero: Hero): void {
  this.selectedHero = hero;
  }*/
}
