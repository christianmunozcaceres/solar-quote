import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';
import { BuildingInsightsResponse } from './google-solar.types';

@Injectable()
export class GoogleSolarService {
  private axiosClient: AxiosInstance;
  private readonly apiKey: string;

  constructor(private configService: ConfigService) {
    const baseURL = configService.get<string>('GOOGLE_SOLAR_API_URL');
    this.apiKey = configService.get<string>('GOOGLE_SOLAR_API_KEY')!;

    this.axiosClient = axios.create({
      baseURL,
    });
  }
  async getBuildingInsights(
    lat: number,
    long: number,
  ): Promise<BuildingInsightsResponse> {
    const { data } = await this.axiosClient.get<BuildingInsightsResponse>(
      '/buildingInsights:findClosest',
      {
        params: {
          'location.latitude': lat,
          'location.longitude': long,
          key: this.apiKey,
        },
      },
    );

    return data;
  }
}
