import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Address } from '../model/address.model';
import { AddressesService } from './addresses.service';

@Injectable({
  providedIn: 'root'
})
export class AddressResolverService implements Resolve<Address[]> {

  constructor(private addressesService: AddressesService, private route: ActivatedRoute) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    var cid  = +route.paramMap.get('cid');
    this.addressesService.setContact(cid);
    var fetchData = this.addressesService.fetchAddresses();
    return fetchData;
  }

}
