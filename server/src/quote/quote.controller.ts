import { Controller, Post, Query } from '@nestjs/common';
import { GoogleSolarService } from 'src/google-solar/google-solar.service';
import { ProductCatalogService } from 'src/product-catalog/product-catalog.service';

@Controller('quote')
export class QuoteController {
  constructor(
    private readonly googleSolar: GoogleSolarService,
    private readonly productCatalog: ProductCatalogService,
  ) {}

  @Post('new')
  async newQuote(@Query('lat') lat: number, @Query('long') long: number) {
    const result = await this.googleSolar.getBuildingInsights(lat, long);
    const {
      solarPotential: { maxArrayPanelsCount: panelCount },
    } = result;

    const panel = this.productCatalog.getPanel();
    const inverter = this.productCatalog.getInverter();

    const materialCosts = panelCount * panel.priceUSD + inverter.priceUSD;

    // This should be editable in some service
    const labourCosts = 7950;

    // This should be editable in some service
    const markupPercentage = 0.2;

    const totalCost = (materialCosts + labourCosts) * (1 + markupPercentage);

    return {
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
}
