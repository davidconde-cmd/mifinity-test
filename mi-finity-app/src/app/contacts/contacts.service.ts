import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Contact } from '../model/contact.model';
import { CommonConstants } from '../share/common-constants';

@Injectable({
  providedIn: 'root'
})

export class ContactsService{

  is_fetching_contacts = false;
  is_fetching_contact = false;
  is_adding_contact = false;

  mock_last_id = 0;

  private contacts : Contact[] = [];

  @Output() contactsChanged = new EventEmitter<Contact[]>();

  activeContact : Contact;

  constructor (private http: HttpClient) { }

  fetchContacts(){

    if (this.is_fetching_contacts) return;

    this.is_fetching_contacts = true;

    return this.http
      .get<Contact[]>( CommonConstants.apiURL + 'contacts' )
      .pipe(tap(contacts => {
        this.is_fetching_contacts = false;
        this.setContacts(contacts);
      }));
  }

  fetchContact(id: number){

    // To avoid requesting the active contact if is already set
    if(this.activeContact){
      return this.activeContact;
    }

    if (this.is_fetching_contact) return;

    this.is_fetching_contact = true;

    return this.http
      .get<Contact>(CommonConstants.apiURL + 'contacts/' + id )
      .pipe(tap(contact => {
        this.is_fetching_contact = false;
        this.setActiveContact(contact);
        return this.activeContact;
      }));
  }

  getContacts() {
    return this.contacts.slice();
  }

  setActiveContact(contact: Contact){
    this.activeContact = contact;
  }

  getActiveContact(){
    return this.activeContact;
  }

  setContacts(contacts_data){
    var contacts : Contact[] = [];

    contacts_data.forEach(contact => {
      try{
        this.mock_last_id = contact.id;
        contacts.push(this.setContact(contact.id, contact.first_name, contact.last_name, contact.avatar));
      } catch(er) {
        console.warn(er);
      }
    });

    this.contacts = contacts;
    this.contactsChanged.next(this.contacts.slice());
  }

  setContact(id: number, first_name: string, last_name : string, avatar: string){

    let contact_id = id;

    if(id == -1){
      this.mock_last_id ++;
      contact_id = this.mock_last_id;
    }

    return new Contact(contact_id, first_name, last_name, avatar);
  }

  addContact(contact: Contact){
    if(this.is_adding_contact) return;

    this.is_adding_contact = true;

    this.http.post( CommonConstants.apiURL + 'contacts', contact).subscribe(responseData => {
      this.is_adding_contact = false;
      this.contacts.push(contact);
      this.contactsChanged.emit(this.contacts);
    }, error => {
        console.log(error);
    });
  }
}
