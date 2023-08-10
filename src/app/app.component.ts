// * Base
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-root',
  template: ` <app-header></app-header>
    <div class="wrapper"><router-outlet></router-outlet></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AppComponent {}
