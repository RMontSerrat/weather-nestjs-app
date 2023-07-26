import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather.service';
import mockAxios from 'jest-mock-axios';
import { HttpService } from '@nestjs/axios';

describe('WeatherService', () => {
  let service: WeatherService;

  let mockHttpService: { get: jest.Mock };

  beforeEach(async () => {
    mockHttpService = {
      get: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        WeatherService,
        {
          provide: HttpService,
          useValue: mockHttpService,
        },
      ],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
  });

  afterEach(() => {
    mockAxios.reset();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get cities data', async () => {
    const mockResponseCities = {
      data: [{ lat: 10, lon: 20, display_name: 'São Paulo' }],
    };
    mockAxios.get.mockResolvedValueOnce(mockResponseCities);
    const result = await service.getCities('São Paulo');
    expect(result[0]).toEqual({
      lat: '-23.5506507',
      lon: '-46.6333824',
      name: 'São Paulo, Região Imediata de São Paulo, Região Metropolitana de São Paulo, Região Geográfica Intermediária de São Paulo, São Paulo, Southeast Region, 01001-000, Brazil',
    });
  });
});
