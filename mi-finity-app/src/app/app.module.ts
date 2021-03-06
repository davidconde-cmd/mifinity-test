import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AddContactComponent } from './contacts/add-contact/add-contact.component';
import { AddressesComponent } from './addresses/addresses.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ErrorComponent } from './error/error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//Angular Material Components
import { DemoMaterialModule } from './material.module';
import { ContactsService } from './contacts/contacts.service';
import { AddressesService } from './addresses/addresses.service';
import { ContactCardComponent } from './contacts/contact-card/contact-card.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ImagePreloadDirective } from './share/image-preload.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './share/confirm-dialog/confirm-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    ContactsComponent,
    AddContactComponent,
    AddressesComponent,
    HeaderComponent,
    HomeComponent,
    ErrorComponent,
    ContactCardComponent,
    ContactDetailComponent,
    ImagePreloadDirective,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    HttpClientModule
  ],
  providers: [ContactsService, AddressesService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
