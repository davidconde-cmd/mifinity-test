import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressResolverService } from './addresses/addresses-resolver.service';
import { AddContactComponent } from './contacts/add-contact/add-contact.component';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactDetailResolver } from './contacts/contact-detail/contact-detail.resolver';
import { ContactsResolverService } from './contacts/contacts-resolver.service';
import { ContactsComponent } from './contacts/contacts.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './home/home.component';
import { CountriesResolverService } from './share/countries.resolver';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'contacts', component: ContactsComponent, resolve: [ContactsResolverService] },
  {path: 'contacts/add-contact', component: AddContactComponent},
  {path: 'contacts/contact-detail/:cid', component: ContactDetailComponent, resolve: [ContactDetailResolver, CountriesResolverService, AddressResolverService]},
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo: 'error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
