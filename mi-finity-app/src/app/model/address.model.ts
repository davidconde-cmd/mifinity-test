export class Address {

  public street1: string;
  public street2: string;
  public town: string;
  public country: string;
  public contactId: number;
  public id: number;

  constructor( id: number, contactId: number, street1: string, street2: string, town: string, country: string ){
    this.street1 = street1;
    this.street2 = street2;
    this.town = town;
    this.country = country;
    this.contactId = contactId;
    this.id = id;
  }

}
