export class QuoteSchema {
  constructor(input: { id: string; name: string; totalPrice: number }) {
    this.id = input.id;
    this.status = QuoteStatus.ESTIMATION;
    this.address = input.name;
    this.totalPrice = input.totalPrice;
  }

  id: string;

  status: QuoteStatus;

  address: string;

  totalPrice: number;
}

export enum QuoteStatus {
  ESTIMATION = 'ESTIMATION',
  REVIEW = 'REVIEW',
  SIGNED = 'SIGNED',
  REJECTED = 'REJECTED',
}
