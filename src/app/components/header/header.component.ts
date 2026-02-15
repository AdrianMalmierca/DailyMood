import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { IonicModule } from '@ionic/angular';
import { Location } from '@angular/common';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [IonicModule],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent implements OnInit {
  showBack = false;

  private noBackRoutes = [
    '/tabs/home',
    '/tabs/search',
    '/tabs/favourites',
    '/tabs/cart',
    '/tabs/settings'
  ];

  constructor(private router: Router, private location: Location) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((e: any) => {
      const url = e.urlAfterRedirects;
      this.showBack = !this.noBackRoutes.includes(url);
      });
  }

  ngOnInit() {}

  goBack() {
    this.location.back();
  }
}