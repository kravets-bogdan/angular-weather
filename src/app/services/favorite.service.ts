// * Base
import { Injectable } from '@angular/core';

@Injectable()
export default class FavoriteService {
  // * Locale
  favorites: string[] = this.getFavoritesFromLocalStorage();

  addToFavorites(city: string) {
    if (!this.favorites.includes(city)) {
      this.favorites.push(city);
      this.updateLocalStorage();
    }
  }

  removeFromFavorites(city: string) {
    if (this.favorites.indexOf(city) !== -1) {
      this.favorites.splice(this.favorites.indexOf(city), 1);
      this.updateLocalStorage();
    }
  }

  isFavorite(city: string): boolean {
    return this.favorites.includes(city);
  }

  private getFavoritesFromLocalStorage(): string[] {
    const favoritesString = localStorage.getItem('favorites');
    if (favoritesString) {
      return JSON.parse(favoritesString);
    }
    return [];
  }

  private updateLocalStorage() {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
