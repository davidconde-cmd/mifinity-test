import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Country } from '../model/Country.model';
import { CountriesService } from './Countries.service';

@Injectable({
  providedIn: 'root'
})
export class CountriesResolverService implements Resolve<Country[]> {

  constructor(private CountriesService: CountriesService, private route: ActivatedRoute) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    var fetchData = this.CountriesService.fetchCountries();
    return fetchData;
  }

}
