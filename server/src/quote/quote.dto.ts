export class PatchQuoteDTO {
  constructor(input: { name: string; totalPrice: number }) {
    this.address = input.name;
    this.totalPrice = input.totalPrice;
  }

  address: string;

  totalPrice: number;
}
