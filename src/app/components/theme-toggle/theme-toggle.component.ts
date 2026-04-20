import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  standalone: true,
  imports: [FormsModule, IonicModule],
})
export class ThemeToggleComponent implements OnInit {
  paletteToggle = false;

  ngOnInit() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)'); //check if user has set a preference in the OS
    this.initializeDarkPalette(prefersDark.matches); //apply the initial palette
    prefersDark.addEventListener('change', (mediaQuery) => this.initializeDarkPalette(mediaQuery.matches)); //listen for changes in the OS preference and update the palette accordingly
  }

  initializeDarkPalette(isDark: boolean) {
    this.paletteToggle = isDark;
    this.toggleDarkPalette(isDark);
  }

  toggleChange(event: CustomEvent) {
    this.toggleDarkPalette(event.detail.checked);
  }

  toggleDarkPalette(shouldAdd: boolean) {
    document.documentElement.classList.toggle('dark', shouldAdd);
  }
}