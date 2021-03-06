import { NgSwitchCase } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { Contact } from 'src/app/model/contact.model';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-add-contact',
  templateUrl: './add-contact.component.html',
  styleUrls: ['./add-contact.component.scss']
})

export class AddContactComponent implements OnInit {

  addContactForm: FormGroup;

  constructor( private contactsService: ContactsService ) { }

  ngOnInit(): void {
    this.addContactForm = new FormGroup(
      {
        'name' : new FormControl(null, [Validators.required, Validators.pattern('^([a-zA-Z]+\\s[a-zA-Z]+){1}$')])
      }
    );
  }

  onSubmit(){

     if(this.addContactForm.valid){
      var full_name = this.addContactForm.value.name;
      var first_name = full_name.split(' ').slice(0, -1).join(' ');
      var last_name = full_name.split(' ').slice(-1).join(' ');
      var contact = this.contactsService.setContact(-1, first_name, last_name, '');
      this.contactsService.addContact(contact);
      this.addContactForm.reset();
    }

  }

}
