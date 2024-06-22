import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { GoogleSolarService } from 'src/google-solar/google-solar.service';

@Module({
  controllers: [QuoteController],
  providers: [GoogleSolarService],
})
export class QuoteModule {}
