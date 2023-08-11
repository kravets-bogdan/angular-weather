// * Types
import { ICityWEatherDescription } from './city.types';

export interface IForecast {
  list: IHourlyForecast[];
}

export interface IDailyForecast {
  date: string;
  hourlyForecasts: IHourlyForecast[];
}

export interface IHourlyForecast {
  dt_txt: string;
  main: {
    temp_max: number;
    temp_min: number;
  };
  weather: ICityWEatherDescription[];
}
