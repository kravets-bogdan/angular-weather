import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  SimpleChanges,
  Component,
  OnChanges,
  Input,
  inject,
} from '@angular/core';
import { NgFor, NgIf, AsyncPipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import SearchCityComponent from '../search-city/search-city.component';

import FiveDaysForecastComponent from '../five-days-forecast/five-days-forecast.component';
import WeatherApiService from '../../services/weather-api.service';
import FavoriteService from '../../services/favorite.service';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

const material = [
  MatSnackBarModule,
  MatDividerModule,
  MatButtonModule,
  MatCardModule,
];

import { ICityData } from '../../DTO/models/city';

@Component({
  standalone: true,
  selector: 'app-daily-forcast',
  templateUrl: './daily-forcast.component.html',
  styleUrls: ['./daily-forcast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WeatherApiService, FavoriteService],
  imports: [
    ...material,
    FiveDaysForecastComponent,
    SearchCityComponent,
    FormsModule,
    DecimalPipe,
    AsyncPipe,
    NgFor,
    NgIf,
  ],
})
export default class DailyForcastComponent implements OnChanges {
  @Input({ required: true }) cities: string = '';
  private readonly weatherApiService = inject(WeatherApiService);
  private readonly favoriteService = inject(FavoriteService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly _snackBar = inject(MatSnackBar);
  public isCityFavorite: boolean = false;
  public showForeCast: boolean = false;
  public city: ICityData | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cities']) {
      this.loadWeatherData();
    }
  }

  public toggleFavorite(city: string): void {
    if (this.favoriteService.isFavorite(city)) {
      this.favoriteService.removeFromFavorites(city);
    } else {
      this.favoriteService.addToFavorites(city);
    }
    this.isCityFavorite = !this.isCityFavorite;
  }

  private loadWeatherData(): void {
    this.weatherApiService.getCity(this.cities).subscribe({
      next: (response) => {
        this.isCityFavorite = this.favoriteService.isFavorite(this.cities);
        this.city = response;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.openSnackBar(error.message);
      },
    });
  }

  private openSnackBar(message: string): void {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
