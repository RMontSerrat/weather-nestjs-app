export interface WeatherData {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: number;
  time: string;
}

export interface CityData {
  name: string;
  lat: string;
  lon: string;
}
