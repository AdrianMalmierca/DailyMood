import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { DetailComponent } from 'src/app/components/detail/detail.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  standalone: true,
  imports: [CommonModule, IonicModule, DetailComponent]
})
export class DetailsPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
