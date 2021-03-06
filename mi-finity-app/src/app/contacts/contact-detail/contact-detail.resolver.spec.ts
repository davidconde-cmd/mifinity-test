import { TestBed } from '@angular/core/testing';

import { ContactDetailResolver } from './contact-detail.resolver';

describe('ContactDetailResolver', () => {
  let resolver: ContactDetailResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ContactDetailResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
