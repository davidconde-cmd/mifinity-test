import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Country } from '../model/country.model';
import { CommonConstants } from './common-constants';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  is_fetching_countries = false;

  countries : Country[];

  constructor( private http: HttpClient ) { }

  getCountries() {
    return this.countries.slice();
  }

  fetchCountries(){

    // To avoid requesting the countries multiple times
    if(this.countries){
      return this.countries;
    }

    if (this.is_fetching_countries) return;

    this.is_fetching_countries = true;

    return this.http
      .get<Country[]>( CommonConstants.apiURL + 'countries/' )
      .pipe(tap(countries => {
        this.is_fetching_countries = false;
        this.setCountries(countries);
      }));
  }


  setCountries(countries_data){
    var countries : Country[] = [];

    countries_data.forEach(country => {
      try{
        countries.push(this.setAddress(country.iso2, country.name));
      } catch(er) {
        console.warn(er);
      }
    });

    this.countries = countries;
  }

  setAddress(iso2: string, name: string){
    return new Country(iso2, name);
  }



}
