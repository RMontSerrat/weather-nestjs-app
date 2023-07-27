import { WeatherService } from './weather.service';
import { Test, TestingModule } from '@nestjs/testing';
import axios from 'axios';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('WeatherService', () => {
  let weatherService: WeatherService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WeatherService],
    }).compile();

    weatherService = module.get<WeatherService>(WeatherService);
  });

  it('should get weather data', async () => {
    const mockResponse = {
      data: {
        current_weather: {
          temperature: 20,
          windspeed: 5,
          winddirection: 180,
          weathercode: 200,
          is_day: true,
          time: '10:00:00',
        },
      },
    };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const lat = 10;
    const lon = 20;
    const result = await weatherService.getWeatherData(lat, lon);

    expect(result).toEqual({
      temperature: 20,
      windspeed: 5,
      winddirection: 180,
      weathercode: 200,
      is_day: true,
      time: '10:00:00',
    });
  });

  it('should get cities', async () => {
    const mockResponse = {
      data: [
        {
          display_name: 'São Paulo',
          lat: '10',
          lon: '20',
        },
      ],
    };
    mockedAxios.get.mockResolvedValueOnce(mockResponse);

    const result = await weatherService.getCities('São Paulo');

    expect(result).toEqual([
      {
        name: 'São Paulo',
        lat: '10',
        lon: '20',
      },
    ]);
  });
});
