import { Controller, Post, Query } from '@nestjs/common';
import { GoogleSolarService } from 'src/google-solar/google-solar.service';

@Controller('quote')
export class QuoteController {
  constructor(private readonly googleSolar: GoogleSolarService) {}
  @Post('new')
  async newQuote(@Query('lat') lat: number, @Query('long') long: number) {
    const result = await this.googleSolar.getBuildingInsights(lat, long);
    console.log({ googleSolarResult: result });

    return result;
  }
}
