import { Injectable } from '@nestjs/common';

@Injectable()
/**
 * This whole service is a mock of something that would connect to a
 * real database or a real tool-integration in the future
 */
export class ProductCatalogService {
  getPanel() {
    return {
      name: 'Pro Panel 440W',
      priceSEK: 3500,
      effectWatt: 440,
    };
  }

  getInverter() {
    return {
      name: 'String Inverter 7.7',
      priceSEK: 25000,
      effectWatt: 7700,
    };
  }
}
