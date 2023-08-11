// * Base
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// * Enviroment
import { environment } from '../../environments/environment';

// * RxJS
import { map } from 'rxjs';

// * Types
import {
  IHourlyForecast,
  IForecast,
} from '../core/DTO/interfaces/forecast.types';
import { ICityData } from '../core/DTO/interfaces/city.types';

type TCities = {
  name: string;
};

@Injectable()
export default class WeatherApiService {
  // * Inject
  private readonly http = inject(HttpClient);

  getAllCities() {
    return this.http.get<TCities[]>('../assets/city.list.json');
  }

  getCity(city: string) {
    return this.http.get<ICityData>(
      `${environment.openWeatherMapAPI}weather?q=${city}`
    );
  }

  getForecast(city: string) {
    return this.http
      .get<IForecast>(`${environment.openWeatherMapAPI}forecast?q=${city}`)
      .pipe(
        map((response) => {
          const dailyForecasts: {
            date: string;
            hourlyForecasts: IHourlyForecast[];
          }[] = [];
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
