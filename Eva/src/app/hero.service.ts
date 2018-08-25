import { Injectable } from '@angular/core';
import {hero} from './hero';
import {HEROES} from './mock-heroes';
import {Observable, of} from 'rxjs';
import {catchError , map, tap} from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private springBootServerURL = '/cHeroes';
  private heroes: Observable<hero[]>;

  constructor(
    private msgService: MessageService,
    private httpClient: HttpClient
  ) { }

  getHeroes(): Observable<hero[]>{
    this.msgService.add('HeroService fetched heroes');
    this.heroes = this.httpClient.get<hero[]>(this.springBootServerURL).pipe(
      tap(resp => this.log(`fetched heroes info from spingboot server: ${resp}`)),
      catchError(this.handleError('HeroService',[]))
    );
    return this.heroes;
  }


  getHeroe(id: number): Observable<hero> {
    this.msgService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.filter(hero => hero.id ===id)[0]);
  }


  private handleError<T>(operaction = 'operaction', result?:T) {
    return (error: any): Observable<T> => {
      console.log(error);
      this.log(`${operaction} failed: ${error.message}`);
      return of(result as T)
    };
  }

  private log(msg: any) {
    this.msgService.add(msg)
  }
}
