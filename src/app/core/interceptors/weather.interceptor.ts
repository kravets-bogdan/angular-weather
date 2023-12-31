import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs';

@Injectable()
export default class WeatherInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!request.url.includes('/assets/city.list.json')) {
      const modifiedReq = request.clone({
        url: `${request.url}&units=metric&appid=${environment.openWeatherMapApiKey}`,
      });

      return next.handle(modifiedReq);
    } else {
      return next.handle(request);
    }
  }
}
