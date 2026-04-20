import { Component, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ProductCardComponent } from '../product-card/product-card.component';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  standalone: true,
  imports: [IonicModule, ProductCardComponent],
})
export class ProductListComponent {
  @Input() products: Product[] = [];
}
