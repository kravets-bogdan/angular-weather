import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { map } from 'rxjs';

import {
  IHourlyForecast,
  IDailyForecast,
  IForecast,
} from '../DTO/models/forecast';
import { ICityData } from '../DTO/models/city';

type TCities = {
  name: string;
};

@Injectable()
export default class WeatherApiService {
  private readonly http = inject(HttpClient);

  public getAllCities() {
    return this.http.get<TCities[]>('../assets/city.list.json');
  }

  public getCity(city: string) {
    return this.http.get<ICityData>(
      `${environment.openWeatherMapAPI}weather?q=${city}`
    );
  }

  public getForecast(city: string) {
    return this.http
      .get<IForecast>(`${environment.openWeatherMapAPI}forecast?q=${city}`)
      .pipe(
        map((response) => {
          const dailyForecasts: IDailyForecast[] = [];
          const hourlyForecastsMap = new Map<string, IHourlyForecast[]>();

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
