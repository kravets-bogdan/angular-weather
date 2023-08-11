import {
  ChangeDetectionStrategy,
  EventEmitter,
  Component,
  inject,
  Output,
  OnInit,
} from '@angular/core';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgFor, AsyncPipe } from '@angular/common';

import { map, startWith } from 'rxjs/operators';
import { Observable } from 'rxjs';

import WeatherApiService from '../../services/weather-api.service';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

const material = [
  MatAutocompleteModule,
  MatFormFieldModule,
  MatSelectModule,
  MatInputModule,
];

type list = {
  name: string;
};

@Component({
  standalone: true,
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [WeatherApiService],
  imports: [...material, ReactiveFormsModule, FormsModule, NgFor, AsyncPipe],
})
export default class SearchCityComponent implements OnInit {
  private readonly weatherApiService = inject(WeatherApiService);
  @Output() selectedCity: EventEmitter<string> = new EventEmitter<string>();
  public filteredCities: Observable<list[]> | undefined;
  public myControl = new FormControl('');
  private currentIndex: number = 100;
  private list: list[] = [];

  ngOnInit(): void {
    this.getCities();
    this.filteredCities = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value || ''))
    );
  }

  public getCity(city: string): void {
    this.selectedCity.emit(city);
  }

  private filter(value: string): list[] {
    const filtered = this.list.filter((city) =>
      city.name.toLowerCase().startsWith(value.toLowerCase())
    );

    return filtered.slice(0, this.currentIndex);
  }

  private getCities(): void {
    this.weatherApiService.getAllCities().subscribe({
      next: (response) => {
        this.list = response;
      },
    });
  }
}
