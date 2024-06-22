import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Quote } from './database.schemas';
import { Model } from 'mongoose';

@Injectable()
export class DatabaseService {
  constructor(@InjectModel(Quote.name) private quoteModel: Model<Quote>) {}

  async createQuote(input: {
    address: string;
    totalPrice: number;
  }): Promise<Quote> {
    const newQuote = new this.quoteModel(input);
    return newQuote.save();
  }

  async getAllQuotes(): Promise<Quote[]> {
    return this.quoteModel.find().exec();
  }
}
