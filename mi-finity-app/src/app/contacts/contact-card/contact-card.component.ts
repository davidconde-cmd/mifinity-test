import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/model/contact.model';
import { CommonConstants } from 'src/app/share/common-constants';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {

  @Input() contact : Contact;

  defaultContactImage : string = CommonConstants.defaultContactImage;

  constructor(private contactsService: ContactsService) { }

  ngOnInit(): void {
  }

  onContactClick(){
    this.contactsService.setActiveContact(this.contact);
  }

}
