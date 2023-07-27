import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { WeatherData, CityData } from './weather.interfaces';

@Controller('weather')
export class WeatherController {
  constructor(private readonly weatherService: WeatherService) {}

  @Get('data')
  async getWeatherData(
    @Query('lat') lat: number,
    @Query('long') long: number,
  ): Promise<WeatherData> {
    const weatherData = await this.weatherService.getWeatherData(lat, long);
    return weatherData;
  }

  @Get('cities')
  async getCities(@Query('address') address: string): Promise<CityData[]> {
    const cities = await this.weatherService.getCities(address);
    return cities;
  }
}
