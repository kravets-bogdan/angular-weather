export interface ICityData {
  name: string;
  main: TCityWeatherData;
  weather: ICityWEatherDescription[];
}

export interface ICityWEatherDescription {
  description: string;
  icon: string;
  id: number;
  main: string;
}

type TCityWeatherData = { temp: number; humidity: number };
