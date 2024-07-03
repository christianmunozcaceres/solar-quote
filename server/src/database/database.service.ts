import { Injectable } from '@nestjs/common';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { CollectionReference, getFirestore } from 'firebase-admin/firestore';
import { ConfigService } from '@nestjs/config';
import { apps, credential } from 'firebase-admin';
import * as path from 'path';
import { QuoteSchema } from './database.schemas';

@Injectable()
export class DatabaseService {
  private collection: CollectionReference;

  constructor(private configService: ConfigService) {
    if (!apps.length && configService.get<string>('NODE_ENV') === 'local') {
      const serviceAccountPath = path.resolve(
        __dirname,
        '../../gcp-service-account.json',
      );
      initializeApp({
        credential: credential.cert(serviceAccountPath),
      });
    } else if (!apps.length) {
      initializeApp({ credential: applicationDefault() });
    }
    const db = getFirestore();

    this.collection = db.collection('quote');
  }

  async createQuote(input: {
    address: string;
    totalPrice: number;
  }): Promise<QuoteSchema> {
    const result = await this.collection.add(input);
    return { id: result.id, ...input };
  }

  async readAllQuotes(): Promise<QuoteSchema[]> {
    const snapshot = await this.collection.get();
    const result: any[] = [];
    snapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() } as QuoteSchema);
    });
    return result;
  }

  async readQuoteById(id: string): Promise<QuoteSchema> {
    const data = (await this.collection.doc(id).get()).data();
    return { id, ...data } as QuoteSchema;
  }

  async updateQuote(input: {
    id: string;
    data: Partial<QuoteSchema>;
  }): Promise<QuoteSchema> {
    await this.collection.doc(input.id).update(input.data);
    const newData = (await this.collection.doc(input.id).get()).data();
    return { id: input.id, ...newData } as QuoteSchema;
  }

  async deleteQuoteById(id: string) {
    return await this.collection.doc(id).delete();
  }
}
