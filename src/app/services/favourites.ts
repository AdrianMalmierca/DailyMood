import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  private favSignal = signal<Product[]>([]);

  favorites = this.favSignal.asReadonly();

  isFavorite = computed(() => {
    const list = this.favSignal();
    return (id: number) => list.some(p => p.id === id);
  });

  constructor() {
    const saved = localStorage.getItem('favorites');
    if (saved) {
      this.favSignal.set(JSON.parse(saved));
    }
  }

  private save() {
    localStorage.setItem('favorites', JSON.stringify(this.favSignal()));
  }

  toggleFavorite(product: Product) {
    const current = this.favSignal();
    const exists = current.some(p => p.id === product.id);

    this.favSignal.set(
      exists
        ? current.filter(p => p.id !== product.id)
        : [...current, product]
    );

    this.save();
  }
}