// * Base
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  SimpleChanges,
  OnChanges,
  Component,
  inject,
  Input,
} from '@angular/core';
import { DatePipe, DecimalPipe, NgFor, NgIf } from '@angular/common';

// * Services
import WeatherApiService from 'src/app/services/weather-api.service';

// * Material
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

const material = [MatSnackBarModule, MatDividerModule, MatCardModule];

// * Types
import { TDailyForecast } from 'src/app/types/forecast.types';

@Component({
  standalone: true,
  selector: 'app-five-days-forecast',
  templateUrl: './five-days-forecast.component.html',
  styleUrls: ['./five-days-forecast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WeatherApiService],
  imports: [...material, NgIf, NgFor, DatePipe, DecimalPipe],
})
export default class FiveDaysForecastComponent implements OnChanges {
  // * Inputs
  @Input({ required: true }) searchCity: string = '';
  // * Inject
  private readonly weatherApiService = inject(WeatherApiService);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly cdr = inject(ChangeDetectorRef);
  // * Local
  public fiveDaysForecast: TDailyForecast[] = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchCity']) {
      this.getForecast();
    }
  }

  private getForecast() {
    this.weatherApiService.getForecast(this.searchCity).subscribe({
      next: (response) => {
        this.fiveDaysForecast = response;
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
