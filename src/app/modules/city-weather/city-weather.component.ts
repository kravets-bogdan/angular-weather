import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIf } from '@angular/common';

import DailyForcastComponent from '../../components/daily-forcast/daily-forcast.component';
import SearchCityComponent from '../../components/search-city/search-city.component';

import { MatDividerModule } from '@angular/material/divider';

@Component({
  standalone: true,
  selector: 'app-city-weather',
  templateUrl: './city-weather.component.html',
  styleUrls: ['./city-weather.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SearchCityComponent, MatDividerModule, NgIf, DailyForcastComponent],
})
export default class CityWeatherComponent {
  public cityName: string = '';

  public weatherCity(city: string): void {
    this.cityName = city;
  }
}
