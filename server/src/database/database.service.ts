import { Injectable } from '@nestjs/common';
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { CollectionReference, getFirestore } from 'firebase-admin/firestore';
import { ConfigService } from '@nestjs/config';
import { apps, credential } from 'firebase-admin';
import * as path from 'path';

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
  }): Promise<any> {
    return await this.collection.add(input);
  }

  async getAllQuotes(): Promise<any> {
    return await this.collection.get();
  }
}
