import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import AppRoutingModule from './app-routing.module';
import { NgModule } from '@angular/core';

import CityWeatherComponent from './modules/city-weather/city-weather.component';
import SearchCityComponent from './components/search-city/search-city.component';
import HeaderComponent from './components/header/header.component';
import AppComponent from './app.component';

import WeatherInterceptor from './core/interceptors/weather.interceptor';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    CityWeatherComponent,
    SearchCityComponent,
    HttpClientModule,
    AppRoutingModule,
    HeaderComponent,
    BrowserModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WeatherInterceptor,
      multi: true,
    },
  ],
})
export default class AppModule {}
