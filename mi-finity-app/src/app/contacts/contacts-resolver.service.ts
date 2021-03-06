import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Contact } from '../model/contact.model';
import { ContactsService } from './contacts.service';

@Injectable({
  providedIn: 'root'
})

export class ContactsResolverService implements Resolve<Contact[]>{

  constructor(private contactsService: ContactsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    var fetchData = this.contactsService.fetchContacts();
    return fetchData;
  }

}
