import { Component, Output, EventEmitter } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class SearchBarComponent {
  searchText = '';

  @Output() searchChange = new EventEmitter<string>();

  onInput() {
    this.searchChange.emit(this.searchText.trim());
  }
}
