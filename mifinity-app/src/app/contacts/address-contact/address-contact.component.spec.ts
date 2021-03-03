import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressContactComponent } from './address-contact.component';

describe('AddressContactComponent', () => {
  let component: AddressContactComponent;
  let fixture: ComponentFixture<AddressContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
