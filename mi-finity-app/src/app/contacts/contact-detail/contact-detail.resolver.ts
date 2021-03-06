import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Contact } from 'src/app/model/contact.model';
import { ContactsService } from '../contacts.service';

@Injectable({
  providedIn: 'root'
})

export class ContactDetailResolver implements Resolve<Contact>{

  constructor(private contactsService: ContactsService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    var cid  = +route.paramMap.get('cid');
    var fetchData = this.contactsService.fetchContact(cid);
    return fetchData;
  }

}

