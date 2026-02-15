import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ProductService } from 'src/app/services/product';
import { Product } from 'src/app/interfaces/product';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';
import { ProductListComponent } from 'src/app/components/product-list/product-list.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, SearchBarComponent, ProductListComponent]
})
export class SearchPage implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading = true;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAll().subscribe({
      next: (res) => {
        this.products = res.products;
        this.filteredProducts = [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando productos', err);
        this.loading = false;
      }
    });
  }

  onSearch(query: string) {
    if (!query) {
      this.filteredProducts = [];
      return;
    }
    this.filteredProducts = this.products.filter(p =>
      p.title.toLowerCase().includes(query.toLowerCase())
    );
  }
}
