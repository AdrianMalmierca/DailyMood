import { Injectable, signal } from '@angular/core';
import { CartItem } from './cart';

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  createdAt: Date;
}

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private ordersSignal = signal<Order[]>([]);
  orders = this.ordersSignal.asReadonly();

  constructor() {
    const saved = localStorage.getItem('orders');
    if (saved) {
      this.ordersSignal.set(JSON.parse(saved));
    }
  }

  private save() {
    localStorage.setItem('orders', JSON.stringify(this.ordersSignal()));
  }

  async processCheckout(items: CartItem[], total: number): Promise<Order> {

    //Simular delay red
    await new Promise(res => setTimeout(res, 1500));

    //Simular fallo 10%
    if (Math.random() < 0.1) {
      throw new Error('Error procesando el pago');
    }

    const newOrder: Order = {
      id: crypto.randomUUID(),
      items,
      total,
      createdAt: new Date()
    };

    this.ordersSignal.set([...this.ordersSignal(), newOrder]);
    this.save();

    return newOrder;
  }
}
