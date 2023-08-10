// * Base
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIf } from '@angular/common';

// * Components
import DailyForcastComponent from '../../components/daily-forcast/daily-forcast.component';
import SearchCityComponent from '../../components/search-city/search-city.component';

// * Material
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
  // * Local
  public cityName: string = '';

  protected weatherCity(city: string) {
    this.cityName = city;
  }
}
