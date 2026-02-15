import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Product } from 'src/app/interfaces/product';
import { RouterModule } from '@angular/router';
import { FavouritesService } from 'src/app/services/favourites';
import { CartService } from 'src/app/services/cart';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  standalone: true,
  imports: [IonicModule, RouterModule],
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(public fav: FavouritesService, public cart: CartService) {}

  added = false;

  toggle(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    this.fav.toggleFavorite(this.product);
  }

  get isFav() {
    return this.fav.isFavorite()(this.product.id);
  }

  addToCart(event: Event) {
    event.stopPropagation();
    event.preventDefault();

    this.cart.addToCart(this.product);

    this.added = true;
    setTimeout(() => this.added = false, 400);
  }
}
