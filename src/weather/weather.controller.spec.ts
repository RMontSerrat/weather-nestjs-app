// src/weather/weather.controller.spec.ts

import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';

describe('WeatherController', () => {
  let weatherController: WeatherController;
  let weatherService: WeatherService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [WeatherController],
      providers: [WeatherService],
    }).compile();

    weatherService = app.get<WeatherService>(WeatherService);
    weatherController = app.get<WeatherController>(WeatherController);
  });

  it('should be defined', () => {
    expect(weatherController).toBeDefined();
  });

  it('should get weather data', async () => {
    const result = {
      temperature: 20,
      windSpeed: 5,
    };

    jest
      .spyOn(weatherService, 'getWeatherData')
      .mockImplementation(() => Promise.resolve(result));

    expect(await weatherController.getWeatherData(10, 20)).toBe(result);
  });

  it('should get cities data', async () => {
    const result = [
      {
        name: 'São Paulo',
        lat: 10,
        lon: 20,
      },
    ];

    jest
      .spyOn(weatherService, 'getCities')
      .mockImplementation(() => Promise.resolve(result));

    expect(await weatherController.getCities('São Paulo')).toBe(result);
  });
});
