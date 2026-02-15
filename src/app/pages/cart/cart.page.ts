import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CartService } from 'src/app/services/cart';
import { AlertController } from '@ionic/angular';
import { OrderService } from 'src/app/services/order';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './cart.page.html'
})
export class CartPage {
  constructor(public cart: CartService, private alertCtrl: AlertController, private orderService: OrderService) {}

  loadingCheckout = false;

  async doCheckout() {

    if (this.cart.cart().length === 0) return;

    this.loadingCheckout = true;

    const items = this.cart.cart();
    const total = this.cart.totalPrice();

    try {

      const order = await this.orderService.processCheckout(items, total);

      this.cart.clearCart();

      const productList = order.items
        .map(i => `${i.product.title} x${i.quantity}`)
        .join('<br>');

      const alert = await this.alertCtrl.create({
        header: 'Compra realizada con éxito',
        message: `
          <strong>Nº Pedido:</strong> ${order.id}<br>
          <strong>Fecha:</strong> ${new Date(order.createdAt).toLocaleString()}<br><br>
          <strong>Productos:</strong><br>
          ${productList}
          <br><br>
          <strong>Total:</strong> ${order.total.toFixed(2)} €
        `,
        buttons: ['OK']
      });

      await alert.present();

    } catch (err) {

      const alert = await this.alertCtrl.create({
        header: 'Error',
        message: 'Ha ocurrido un error procesando el pago. Inténtalo de nuevo.',
        buttons: ['OK']
      });

      await alert.present();
    }

    this.loadingCheckout = false;
  }
}