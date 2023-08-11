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

import WeatherApiService from 'src/app/services/weather-api.service';

import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';

const material = [MatSnackBarModule, MatDividerModule, MatCardModule];

import { IDailyForecast } from '../../DTO/models/forecast';

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
  @Input({ required: true }) searchCity: string = '';
  private readonly weatherApiService = inject(WeatherApiService);
  private readonly _snackBar = inject(MatSnackBar);
  private readonly cdr = inject(ChangeDetectorRef);
  public fiveDaysForecast: IDailyForecast[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchCity']) {
      this.getForecast();
    }
  }

  private getForecast(): void {
    this.weatherApiService.getForecast(this.searchCity).subscribe({
      next: (response) => {
        this.fiveDaysForecast = response;
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
