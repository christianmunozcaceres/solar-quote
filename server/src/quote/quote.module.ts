import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { GoogleSolarService } from 'src/google-solar/google-solar.service';
import { ProductCatalogService } from 'src/product-catalog/product-catalog.service';
import { DatabaseService } from 'src/database/database.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Quote, QuoteSchema } from 'src/database/database.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quote.name, schema: QuoteSchema }]),
  ],
  controllers: [QuoteController],
  providers: [GoogleSolarService, ProductCatalogService, DatabaseService],
})
export class QuoteModule {}
