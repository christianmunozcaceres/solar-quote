import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuoteController } from './quote/quote.controller';
import { GoogleSolarService } from './google-solar/google-solar.service';
import { QuoteModule } from './quote/quote.module';
import { ConfigModule } from '@nestjs/config';
import { ProductCatalogService } from './product-catalog/product-catalog.service';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database/database.service';
import { Quote, QuoteSchema } from './database/database.schemas';

@Module({
  imports: [
    QuoteModule,
    ConfigModule.forRoot({ isGlobal: true }),
    // create database-service for decoupled code
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    MongooseModule.forFeature([{ name: Quote.name, schema: QuoteSchema }]),
  ],
  controllers: [AppController, QuoteController],
  providers: [
    AppService,
    GoogleSolarService,
    ProductCatalogService,
    DatabaseService,
  ],
})
export class AppModule {}
