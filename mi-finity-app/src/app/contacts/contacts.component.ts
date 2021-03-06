import { Component, OnInit } from '@angular/core';
import { Contact } from '../model/contact.model';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
})

export class ContactsComponent implements OnInit {

  contacts : Contact[] = [];
  selectedContact : Contact;

  constructor(private contactsService : ContactsService) {
  }

  ngOnInit(): void {

    this.contacts = this.contactsService.getContacts();

    this.contactsService.contactsChanged.subscribe((contacts : Contact[]) => {
      this.contacts = contacts;
    });
  }
}
