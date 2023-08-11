export interface ICityData {
  name: string;
  main: ICityWeatherData;
  weather: ICityWEatherDescription[];
}

export interface ICityWEatherDescription {
  description: string;
  icon: string;
  id: number;
  main: string;
}

interface ICityWeatherData {
  temp: number;
  humidity: number;
}
