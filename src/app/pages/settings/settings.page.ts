import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { ThemeToggleComponent } from 'src/app/components/theme-toggle/theme-toggle.component';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [ThemeToggleComponent, IonicModule]
})
export class SettingsPage{

  constructor() { }
}
