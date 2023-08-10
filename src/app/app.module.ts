// * Base
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import AppRoutingModule from './app-routing.module';
import { NgModule } from '@angular/core';

// * Components
import CityWeatherComponent from './modules/city-weather/city-weather.component';
import SearchCityComponent from './components/search-city/search-city.component';
import HeaderComponent from './components/header/header.component';
import AppComponent from './app.component';

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
})
export default class AppModule {}
