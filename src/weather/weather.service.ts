// src/weather/weather.service.ts

import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class WeatherService {
  async getWeatherData(lat: number, long: number) {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`,
    );
    const weatherData = response.data;
    console.log(weatherData, 'weatherData');
    return weatherData.current_weather;
  }

  async getCities(address: string) {
    const response = await axios.get(
      `https://geocode.maps.co/search?q=${address}`,
    );
    const cityData = response.data;

    return cityData.map((city) => ({
      name: city.display_name,
      lat: city.lat,
      lon: city.lon,
    }));
  }
}
