import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { HeroService } from '../hero.service';
import { hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: hero;
  constructor(
    private activatiedRoute: ActivatedRoute,
    private location: Location,
    private heroService: HeroService
  ) { }
  ngOnInit() {
    this.getHero()
  }

  getHero(): void {
    const id = +this.activatiedRoute.snapshot.paramMap.get('id');
    this.heroService.getHeroe(id).subscribe(hero => this.hero = hero)
  }

  goBack(): void {
    this.location.back()
  }
}
