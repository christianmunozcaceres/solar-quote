import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type QuoteDocument = HydratedDocument<Quote>;

@Schema()
export class Quote {
  constructor(input: { name: string; totalPrice: number }) {
    this.address = input.name;
    this.totalPrice = input.totalPrice;
  }

  @Prop()
  address: string;

  @Prop()
  totalPrice: number;
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);
