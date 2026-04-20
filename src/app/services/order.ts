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

    //Delayed response to simulate real checkout process
    await new Promise(res => setTimeout(res, 1500));

    //Simulate failure 10% of the time
    if (Math.random() < 0.1) {
      throw new Error('Error processing payment');
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
