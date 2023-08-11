import { ICityWEatherDescription } from './city';

export interface IForecast {
  list: IHourlyForecast[];
}

export interface IDailyForecast {
  date: string;
  hourlyForecasts: IHourlyForecast[];
}

export interface IHourlyForecast {
  dt_txt: string;
  main: IHourlyForecastMain;
  weather: ICityWEatherDescription[];
}

interface IHourlyForecastMain {
  temp_max: number;
  temp_min: number;
}
