import { Injectable } from '@nestjs/common';

@Injectable()
/**
 * This whole service is a mock of something that would connect to a
 * real database or a real tool-integration in the future
 */
export class ProductCatalogService {
  getPanel() {
    return {
      name: 'Pro Panel 400W',
      priceUSD: 300,
      effectWatt: 400,
    };
  }

  getInverter() {
    return {
      name: 'String Inverter 7.7',
      priceUSD: 1750,
      effectWatt: 7700,
    };
  }
}
