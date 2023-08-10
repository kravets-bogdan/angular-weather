// * Types
import { TCityWEatherDescription } from './city.types';

export type TForecast = {
  list: THourlyForecast[];
};

export type TDailyForecast = {
  date: string;
  hourlyForecasts: THourlyForecast[];
};

export type THourlyForecast = {
  dt_txt: string;
  main: {
    temp_max: number;
    temp_min: number;
  };
  weather: TCityWEatherDescription[];
};
