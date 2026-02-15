import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FavouritesService } from 'src/app/services/favourites';
import { ProductListComponent } from 'src/app/components/product-list/product-list.component';

@Component({
  standalone: true,
  selector: 'app-favourites',
  templateUrl: './favourites.page.html',
  imports: [CommonModule, IonicModule, ProductListComponent]
})
export class FavouritesPage {
  constructor(public fav: FavouritesService) {}
}
