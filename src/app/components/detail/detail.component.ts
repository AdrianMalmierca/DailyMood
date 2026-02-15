import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product';
import { Product } from 'src/app/interfaces/product';
import { ViewEncapsulation } from '@angular/core';
import { CartService } from 'src/app/services/cart';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  imports: [CommonModule, IonicModule],
  encapsulation: ViewEncapsulation.None
})
export class DetailComponent  implements OnInit {
  product?: Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    public cart: CartService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getById(id).subscribe({
      next: (res) => this.product = res,
      error: (err) => console.error('Error cargando producto', err)
    });
  }
}
