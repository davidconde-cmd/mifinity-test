import { HttpClient } from '@angular/common/http';

import { map, tap } from 'rxjs/operators';
import { Injectable, Output, EventEmitter } from '@angular/core';
import { Address } from '../model/address.model';
import { CommonConstants } from '../share/common-constants';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddressesService {

  is_fetching_addresses = false;
  is_adding_address = false;

  addresses : Address[];

  cid : number;

  mock_last_id = 0;

  @Output() addressesChanged = new EventEmitter<Address[]>();

  constructor( private http: HttpClient ) { }

  getAddresses() {
    return this.addresses.slice();
  }

  fetchAddresses(){
    if (this.is_fetching_addresses) return;

    this.is_fetching_addresses = true;

    return this.http
      .get<Address[]>( CommonConstants.apiURL + 'contacts/' + this.cid + '/addresses')
      .pipe(tap(addresses => {
        this.is_fetching_addresses = false;
        this.setAddresses(addresses);
      }));
  }

  setAddresses(addresses_data){
    var addresses : Address[] = [];

    addresses_data.forEach(address => {
      try{
        this.mock_last_id = address.id;
        addresses.push(this.setAddress(address.id, address.contactId, address.street1, address.street2, address.town, address.country));
      } catch(er) {
        console.warn(er);
      }
    });

    this.addresses = addresses;
    this.addressesChanged.next(this.addresses.slice());
  }

  setAddress(id: number, contactId: number, street1: string, street2 : string, town: string, country: string){

    let contact_id = id;

    if(id == -1){
      this.mock_last_id ++;
      contact_id = this.mock_last_id;
    }

    return new Address(id, contactId, street1, street2, town, country);
  }

  setContact(cid: number){
    this.cid = cid;
  }

  deleteAddress(key: number, id: number ) {

    return this.http.delete(CommonConstants.apiURL + 'addresses/' + id)
    .toPromise()
    .then( response => {
      delete this.addresses[key];
      this.addressesChanged.next(this.addresses.slice());
      return true
    })
    .catch( () => { return false } );

  }

  postAddresses(addresses_info : []){

    console.log('🚀 ~ file: addresses.service.ts ~ line 92 ~ AddressesService ~ postAddresses ~ addresses_info', addresses_info)

    for(let i=0; i < addresses_info.length; i++){

      var address_data = addresses_info[i];
      let exists = false;


      for(let u=0; u < this.addresses.length; u++){
        if(this.addresses[u].id === address_data['id']){
          this.addresses[u].street1 = address_data['street1'];
          this.addresses[u].street2 = address_data['street2'];
          this.addresses[u].town = address_data['town'];
          this.addresses[u].country = address_data['country'];
          exists = true;
        }
      }

      if(!exists){
        this.mock_last_id++;
        let new_address = this.setAddress(this.mock_last_id, this.cid, address_data['street1'], address_data['street2'], address_data['town'], address_data['country'])
        this.addresses.push(new_address);
      }

    }


    for(let u=0; u < this.addresses.length; u++){
      this.http.post( CommonConstants.apiURL + 'contacts/' + this.cid + '/addresses' , this.addresses).subscribe(responseData => {
        console.log('🚀 ~ file: addresses.service.ts ~ line 116 ~ AddressesService ~ this.http.post ~ responseData', responseData)
      }, error => {
          console.log(error);
      });
    }

  }
}
