import { Controller, Get, Post, Query } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { GoogleSolarService } from 'src/google-solar/google-solar.service';
import { ProductCatalogService } from 'src/product-catalog/product-catalog.service';

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

    const materialCosts = panelCount * panel.priceUSD + inverter.priceUSD;

    // This should be editable in some service
    const labourCosts = 7950;

    // This should be editable in some service
    const markupPercentage = 0.2;

    const totalCost = (materialCosts + labourCosts) * (1 + markupPercentage);

    await this.database.createQuote({
      address: buildingAddress,
      totalPrice: totalCost,
    });

    return {
      buildingAddress,
      material: [
        { name: panel.name, pricePerUnit: panel.priceUSD, count: panelCount },
        { name: inverter.name, pricePerUnit: inverter.priceUSD, count: 1 },
      ],
      materialCosts,
      labourCosts,
      markupCost: (materialCosts + labourCosts) * markupPercentage,
      totalCost,
    };
  }

  @Get()
  async getAllQuotes() {
    return await this.database.getAllQuotes();
  }
}
