// * Base
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// * RxJS
import { map } from 'rxjs';

// * Types
import { TForecast, THourlyForecast } from '../types/forecast.types';
import { TCityData } from '../types/city.types';

type TCities = {
  name: string;
};

@Injectable()
export default class WeatherApiService {
  // * Inject
  private readonly http = inject(HttpClient);
  // * local
  private readonly apiKey = '36c415082cd1b09d49c15ce6dc314676';
  private readonly API = 'https://api.openweathermap.org/data/2.5/';

  getAllCities() {
    return this.http.get<TCities[]>('../assets/city.list.json');
  }

  getCity(city: string) {
    return this.http.get<TCityData>(
      `${this.API}weather?q=${city}&units=metric&appid=${this.apiKey}`
    );
  }

  getForecast(city: string) {
    return this.http
      .get<TForecast>(
        `${this.API}forecast?q=${city}&units=metric&appid=${this.apiKey}`
      )
      .pipe(
        map((response) => {
          const dailyForecasts: {
            date: string;
            hourlyForecasts: THourlyForecast[];
          }[] = [];
          const hourlyForecastsMap = new Map<string, THourlyForecast[]>();

          response.list.forEach((forecast) => {
            const date = forecast.dt_txt.split(' ')[0];
            if (!hourlyForecastsMap.has(date)) {
              hourlyForecastsMap.set(date, []);
            }
            hourlyForecastsMap.get(date)?.push(forecast);
          });

          hourlyForecastsMap.forEach((hourlyForecasts, date) => {
            dailyForecasts.push({ date, hourlyForecasts });
          });

          return dailyForecasts;
        })
      );
  }
}
