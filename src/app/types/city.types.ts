export type TCityData = {
  name: string;
  main: TCityWeatherData;
  weather: TCityWEatherDescription[];
};

export type TCityWEatherDescription = {
  description: string;
  icon: string;
  id: number;
  main: string;
};

type TCityWeatherData = { temp: number; humidity: number };
