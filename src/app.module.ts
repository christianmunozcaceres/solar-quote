import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QuoteController } from './quote/quote.controller';
import { GoogleSolarService } from './google-solar/google-solar.service';
import { QuoteModule } from './quote/quote.module';
import { ConfigModule } from '@nestjs/config';
import { ProductCatalogService } from './product-catalog/product-catalog.service';
import { DatabaseService } from './database/database.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    QuoteModule,
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'client') }),
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
