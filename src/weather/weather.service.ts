import { Injectable } from '@nestjs/common';
import { WeatherData, CityData } from './weather.interfaces';
import axios from 'axios';

@Injectable()
export class WeatherService {
  async getWeatherData(lat: number, long: number): Promise<WeatherData> {
    const response = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current_weather=true`,
    );
    const weatherData = response.data;
    return {
      temperature: weatherData.current_weather.temperature,
      windspeed: weatherData.current_weather.windspeed,
      winddirection: weatherData.current_weather.winddirection,
      weathercode: weatherData.current_weather.weathercode,
      is_day: weatherData.current_weather.is_day,
      time: weatherData.current_weather.time,
    };
  }

  async getCities(address: string): Promise<CityData[]> {
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
