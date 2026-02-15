import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../interfaces/product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private cartSignal = signal<CartItem[]>([]);

  cart = this.cartSignal.asReadonly();

  totalItems = computed(() =>
    this.cartSignal().reduce((acc, item) => acc + item.quantity, 0)
  );

  totalPrice = computed(() =>
    this.cartSignal().reduce((acc, item) =>
      acc + (item.product.price * item.quantity), 0)
  );

  constructor() {
    const saved = localStorage.getItem('cart');
    if (saved) {
      this.cartSignal.set(JSON.parse(saved));
    }
  }

  private save() {
    localStorage.setItem('cart', JSON.stringify(this.cartSignal()));
  }

  addToCart(product: Product) {
    const current = this.cartSignal();
    const existing = current.find(i => i.product.id === product.id);

    if (existing) {
      if (existing.quantity >= product.stock) return; // límite real
      existing.quantity++;
      this.cartSignal.set([...current]);
    } else {
      if (product.stock <= 0) return;
      this.cartSignal.set([...current, { product, quantity: 1 }]);
    }

    this.save();
  }

  isOutOfStock(product: Product): boolean {
    const item = this.cartSignal().find(i => i.product.id === product.id);
    const quantity = item ? item.quantity : 0;
    return quantity >= product.stock;
  }


  removeFromCart(productId: number) {
    this.cartSignal.set(
      this.cartSignal().filter(i => i.product.id !== productId)
    );
    this.save();
  }

  decreaseQuantity(productId: number) {
    const current = this.cartSignal();
    const item = current.find(i => i.product.id === productId);

    if (!item) return;

    if (item.quantity > 1) {
      item.quantity--;
      this.cartSignal.set([...current]);
    } else {
      this.removeFromCart(productId);
    }

    this.save();
  }

  checkout(): Promise<boolean> {
    return new Promise(resolve => {
      setTimeout(() => {
        this.clearCart();
        resolve(true);
      }, 1500);
    });
  }


  clearCart() {
    this.cartSignal.set([]);
    this.save();
  }
}
