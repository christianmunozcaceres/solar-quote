import { Test, TestingModule } from '@nestjs/testing';
import { GoogleSolarService } from './google-solar.service';

describe('GoogleSolarService', () => {
  let service: GoogleSolarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoogleSolarService],
    }).compile();

    service = module.get<GoogleSolarService>(GoogleSolarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
