import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddressesService } from 'src/app/addresses/addresses.service';
import { Address } from 'src/app/model/address.model';
import { Contact } from 'src/app/model/contact.model';
import { Country } from 'src/app/model/Country.model';
import { CommonConstants } from 'src/app/share/common-constants';
import { CountriesService } from 'src/app/share/Countries.service';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.scss']
})
export class ContactDetailComponent implements OnInit {

  contact: Contact;
  addresses: Address[] = [];
  countries: Country[] = [];
  defaultContactImage : string = CommonConstants.defaultContactImage;

  constructor(  private contactsService: ContactsService,
                private addressesService: AddressesService,
                private countriesService: CountriesService) { }



  ngOnInit(): void {
    this.contact    = this.contactsService.getActiveContact();
    this.addresses  = this.addressesService.getAddresses();
    this.countries  = this.countriesService.getCountries();
  }

}
