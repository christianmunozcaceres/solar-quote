import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { GoogleSolarService } from 'src/google-solar/google-solar.service';
import { ProductCatalogService } from 'src/product-catalog/product-catalog.service';
import { PatchQuoteDTO } from './quote.dto';

@Controller('quote')
export class QuoteController {
  constructor(
    private readonly googleSolar: GoogleSolarService,
    private readonly productCatalog: ProductCatalogService,
    private readonly database: DatabaseService,
  ) {}

  @Post('new')
  async newQuote(@Query('lat') lat: number, @Query('long') long: number) {
    const googleSolarResponse = await this.googleSolar.getBuildingInsights(
      lat,
      long,
    );
    console.log({ googleSolarResponse });

    const {
      name: buildingAddress,
      solarPotential: { maxArrayPanelsCount: panelCount },
    } = googleSolarResponse;

    const panel = this.productCatalog.getPanel();
    const inverter = this.productCatalog.getInverter();
    const materialCostSEK = panelCount * panel.priceSEK + inverter.priceSEK;

    const installationTimePerPanelHours = 1.25;
    const installationCostPerHourSEK = 500;
    const installationTimeHours = panelCount * installationTimePerPanelHours;
    const labourCostSEK = installationTimeHours * installationCostPerHourSEK;

    // This should be editable in some service
    const markupPercentage = 0.3;
    const materialCostWithMarkup = materialCostSEK * (1 + markupPercentage);
    const labourCostWithMarkup = labourCostSEK * (1 + markupPercentage);
    const totalCostWithMarkup = materialCostWithMarkup + labourCostWithMarkup;

    const quote = await this.database.createQuote({
      address: buildingAddress,
      totalPrice: totalCostWithMarkup,
    });

    return {
      id: quote.id,
      buildingAddress,
      material: {
        panelName: panel.name,
        panelCount,
        inverterName: inverter.name,
      },
      installationTimeDays: Math.ceil(installationTimeHours / 8),
      costsWithMarkupSEK: {
        materials: materialCostWithMarkup,
        labour: labourCostWithMarkup,
        total: totalCostWithMarkup,
      },
    };
  }

  @Get()
  async getAllQuotes() {
    return await this.database.readAllQuotes();
  }

  @Get(':id')
  async getQuoteById(@Param('id') id: string) {
    return await this.database.readQuoteById(id);
  }

  @Patch(':id')
  async patchQuote(@Param('id') id: string, @Body() quoteDTO: PatchQuoteDTO) {
    return await this.database.updateQuote({ id, data: quoteDTO });
  }

  @Delete(':id')
  @HttpCode(204)
  async delteQuoteById(@Param('id') id: string) {
    await this.database.deleteQuoteById(id);
    return;
  }
}
