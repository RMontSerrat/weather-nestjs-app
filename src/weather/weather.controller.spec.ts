import { Test, TestingModule } from '@nestjs/testing';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { WeatherData, CityData } from './weather.interfaces';

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
    const result: WeatherData = {
      temperature: 20,
      windspeed: 5,
      winddirection: 10,
      weathercode: 1,
      is_day: 1,
      time: '2022-10-10T10:00:00',
    };

    jest
      .spyOn(weatherService, 'getWeatherData')
      .mockImplementation(() => Promise.resolve(result));

    expect(await weatherController.getWeatherData(10, 20)).toBe(result);
  });

  it('should get cities data', async () => {
    const result: CityData[] = [
      {
        name: 'São Paulo',
        lat: '10',
        lon: '20',
      },
    ];

    jest
      .spyOn(weatherService, 'getCities')
      .mockImplementation(() => Promise.resolve(result));

    expect(await weatherController.getCities('São Paulo')).toBe(result);
  });
});
