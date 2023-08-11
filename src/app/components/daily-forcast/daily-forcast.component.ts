// * Base
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

// * Components
import SearchCityComponent from '../search-city/search-city.component';

// * Service
import FiveDaysForecastComponent from '../five-days-forecast/five-days-forecast.component';
import WeatherApiService from '../../services/weather-api.service';

// * Material
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

// * Types
import { TCityData } from 'src/app/types/city.types';
import FavoriteService from 'src/app/services/favorite.service';

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
  // * Inputs
  @Input({ required: true }) cities: string = '';
  // * Inject
  private readonly weatherApiService = inject(WeatherApiService);
  private readonly favoriteService = inject(FavoriteService);
  private readonly cdr = inject(ChangeDetectorRef);
  private readonly _snackBar = inject(MatSnackBar);
  // * Local
  public isCityFavorite: boolean = false;
  public showForeCast: boolean = false;
  public city: TCityData | undefined;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cities']) {
      this.loadWeatherData();
    }
  }

  protected toggleFavorite(city: string): void {
    if (this.favoriteService.isFavorite(city)) {
      this.favoriteService.removeFromFavorites(city);
    } else {
      this.favoriteService.addToFavorites(city);
    }
    this.isCityFavorite = !this.isCityFavorite;
  }

  private loadWeatherData() {
    this.weatherApiService.getCity(this.cities).subscribe({
      next: (response) => {
        this.isCityFavorite = this.favoriteService.isFavorite(this.cities);
        this.city = response;
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.openSnackBar(error.message);
        console.log('error: ', error);
      },
    });
  }

  private openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      duration: 3000,
    });
  }
}
