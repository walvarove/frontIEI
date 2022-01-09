import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

type LoadedStatesType = {
  catalunya: boolean,
  valencia: boolean,
  euskadi: boolean
}

@Injectable({
  providedIn: 'root'
})
export class LoadService {

  private url = environment.apiBaseurl;

  
  loadedStates: LoadedStatesType = {
    catalunya: false,
    valencia: false,
    euskadi: false
  }
  
  loadedStates$ = new BehaviorSubject<LoadedStatesType>(this.loadedStates);

  constructor(private http: HttpClient) { }

  get allSelected() {
    return Object.values(this.loadedStates$.getValue()).every(value => value);
  }

  setFullLoaded(loaded: LoadedStatesType) {
    this.loadedStates = {...loaded};
    this.loadedStates$.next(this.loadedStates)
  }

  setLoaded(check: keyof LoadedStatesType, value = true) {
    this.loadedStates = { 
      ...this.loadedStates,
      [check]: value
    }
    this.loadedStates$.next(this.loadedStates)
  }


  cargar(endpoint: string) {
    return this.http.post(this.url + "load?" + endpoint, null);
  }

  delete() {
    return this.http.delete(this.url);
  }
}
