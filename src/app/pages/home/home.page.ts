import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, IonSpinner } from '@ionic/angular';
import { ProductService } from 'src/app/services/product';
import { Product } from 'src/app/interfaces/product';
import { ProductListComponent } from 'src/app/components/product-list/product-list.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, ProductListComponent]
})
export class HomePage implements OnInit {
  products: Product[] = [];
  loading = true;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (res) => {
        this.products = res.products;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando productos', err);
        this.loading = false;
      }
    });
  }
}