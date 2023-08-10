// * Base
import { RouterLink } from '@angular/router';
import { Component } from '@angular/core';

// * Material
import { MatButtonModule } from '@angular/material/button';

@Component({
  standalone: true,
  selector: 'app-header',
  template: ` <header>
    <h1>Weather Angular Application</h1>
    <nav>
      <ul>
        <li><a mat-raised-button color="primary" routerLink="/">Home</a></li>
        <li>
          <a mat-raised-button color="primary" routerLink="/favorite"
            >Favorite</a
          >
        </li>
      </ul>
    </nav>
  </header>`,
  styleUrls: ['./header.component.scss'],
  imports: [RouterLink, MatButtonModule],
})
export default class HeaderComponent {}
