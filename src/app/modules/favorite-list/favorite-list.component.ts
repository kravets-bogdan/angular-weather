// * Base
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { NgFor } from '@angular/common';

// * Components
import DailyForcastComponent from '../../components/daily-forcast/daily-forcast.component';

// * Service
import FavoriteService from 'src/app/services/favorite.service';

@Component({
  standalone: true,
  selector: 'app-favorite-list',
  templateUrl: './favorite-list.component.html',
  styleUrls: ['./favorite-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FavoriteService],
  imports: [NgFor, DailyForcastComponent],
})
export default class FavoriteListComponent implements OnInit {
  // * Inject
  private readonly favoriteService = inject(FavoriteService);
  // * Local
  public cities: string[] = [];

  ngOnInit() {
    this.cities = this.favoriteService.favorites;
  }
}
