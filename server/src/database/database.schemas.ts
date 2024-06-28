export class QuoteDTO {
  constructor(input: { id: string; name: string; totalPrice: number }) {
    this.id = input.id;
    this.address = input.name;
    this.totalPrice = input.totalPrice;
  }

  id: string;

  address: string;

  totalPrice: number;
}
