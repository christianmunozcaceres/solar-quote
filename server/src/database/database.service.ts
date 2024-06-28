import { Injectable } from '@nestjs/common';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { CollectionReference, getFirestore } from 'firebase-admin/firestore';
import { ConfigService } from '@nestjs/config';
import { apps, credential } from 'firebase-admin';
import * as path from 'path';
import { QuoteDTO } from './database.schemas';

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
  }): Promise<QuoteDTO> {
    const result = await this.collection.add(input);
    return { id: result.id, ...input };
  }

  // Can I remove any type?
  async getAllQuotes(): Promise<any[]> {
    const snapshot = await this.collection.get();
    const result: any[] = [];
    snapshot.forEach((doc) => {
      result.push({ id: doc.id, ...doc.data() });
    });
    return result;
  }
}
