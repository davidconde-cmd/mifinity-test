import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Address } from '../model/address.model';
import { Country } from '../model/Country.model';
import { ConfirmDialogComponent } from '../share/confirm-dialog/confirm-dialog.component';
import { CountriesService } from '../share/Countries.service';
import { AddressesService } from './addresses.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})

export class AddressesComponent implements OnInit {

  addresses : Address[] = [];
  countries : Country[] = [];
  selectedContact : Address;
  addressesForm : FormGroup;

  constructor(  private addressesService : AddressesService,
                private countriesService : CountriesService,
                private fb: FormBuilder,
                private dialog: MatDialog) {


  }

  ngOnInit(): void {

    this.addresses = this.addressesService.getAddresses();
    this.countries = this.countriesService.getCountries();


    this.addressesService.addressesChanged.subscribe((addresses : Address[]) => {
      this.addresses = addresses;

      this.addressesForm = this.fb.group({
        'addresses': this.fb.array([])
      });

      this.setAddressesFormArray();

    });

    this.addressesForm = this.fb.group({
      'addresses': this.fb.array([])
    });

    this.setAddressesFormArray();
  }

  get formAddresses() {
    return <FormArray>this.addressesForm.get('addresses');
   }

  setAddressesFormArray(){
    this.addresses.forEach(address => {
      this.addAddressFormControl(address)
    });
  }

  addAddressFormControl(address){
    let addressesArray  = this.addressesForm.controls.addresses as FormArray;
    let arraylen    = addressesArray.length;

    let newAddressgroup: FormGroup = this.fb.group({
      street1: [null, [ Validators.required ]],
      street2: [null, [ Validators.required ]],
      town: [null, [ Validators.required ]],
      country: [null, [ Validators.required ]],
      id: [null]
    })

    newAddressgroup.setValue({
      street1: address.street1,
      street2: address.street2,
      town: address.town,
      country: address.country,
      id: address.id
    });

    addressesArray.insert(arraylen, newAddressgroup);
  }

  addFormControl() {
    let addressesArray  = this.addressesForm.controls.addresses as FormArray;
    let arraylen = addressesArray.length;

    let newAddressgroup: FormGroup = this.fb.group({
      'street1': ['', [ Validators.required ]],
      'street2': ['', [ Validators.required ]],
      'town': ['', [ Validators.required ]],
      'country': ['', [ Validators.required ]]
    })

    addressesArray.insert(arraylen, newAddressgroup);
  }

  removeFormControl(i) {

    var addressId = this.addressesForm.controls.addresses.value[i].id;

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
          title: "Are you sure?",
          message: "You are about to delete an address "}
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult == true){

        if(addressId){
          this.addressesService.deleteAddress(i, addressId).then(valid => {
            if(valid){
              alert("ok");
            } else {
              alert("nok");
            }
          });
        } else {
          let addressesArray  = this.addressesForm.controls.addresses as FormArray;
          addressesArray.removeAt(i);
        }
      }
    });

  }

  submitForm() {

    this.addressesService.postAddresses(this.addressesForm.value.addresses);
  }



}


