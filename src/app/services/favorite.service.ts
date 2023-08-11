import { Injectable } from '@angular/core';

@Injectable()
export default class FavoriteService {
  public favorites: string[] = this.getFavoritesFromLocalStorage();

  public addToFavorites(city: string): void {
    if (!this.favorites.includes(city)) {
      this.favorites.push(city);
      this.updateLocalStorage();
    }
  }

  public removeFromFavorites(city: string): void {
    if (this.favorites.indexOf(city) !== -1) {
      this.favorites.splice(this.favorites.indexOf(city), 1);
      this.updateLocalStorage();
    }
  }

  public isFavorite(city: string): boolean {
    return this.favorites.includes(city);
  }

  private getFavoritesFromLocalStorage(): string[] {
    const favoritesString = localStorage.getItem('favorites');
    if (favoritesString) {
      return JSON.parse(favoritesString);
    }
    return [];
  }

  private updateLocalStorage(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }
}
