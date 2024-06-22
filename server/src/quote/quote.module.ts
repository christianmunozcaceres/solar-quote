import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { GoogleSolarService } from 'src/google-solar/google-solar.service';
import { ProductCatalogService } from 'src/product-catalog/product-catalog.service';

@Module({
  controllers: [QuoteController],
  providers: [GoogleSolarService, ProductCatalogService],
})
export class QuoteModule {}
