import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cities, Libraries } from '../models/search.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  apiBaseUrl = environment.apiBaseurl;

  constructor(
    private http: HttpClient
  ) { }

  getLocations(): Observable<Cities>{
    return this.http.get<Cities>(`${this.apiBaseUrl}locations`);
  }

  getLibraries(
    city: string,
    postalCode: string,
    province: string,
    type: string
  ): Observable<Libraries>{
    let cityString;
    let localityString;
    let provinceString;
    let typeString;
    city !== '' && city !== undefined ? cityString = `&state_id=${city}` : cityString = '';
    postalCode !== '' && postalCode !== undefined ? localityString = `&locality_id=${postalCode}` : localityString = '';
    province !== '' && province !== undefined ? provinceString = `&province_id=${province}` : provinceString = '';
    type !== '' && type !== undefined ?  typeString = `&type=${type}` : typeString = '';
    return this.http.get<Libraries>(`${this.apiBaseUrl}libraries?` + cityString + localityString + provinceString + typeString);
  }

  getAllLibraries(): Observable<Libraries>{
    return this.http.get<Libraries>(`${this.apiBaseUrl}libraries?`);
  }
}
