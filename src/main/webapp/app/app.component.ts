import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NavigationStart, Router, RouterLink, RouterOutlet} from '@angular/router';
import { HeaderComponent } from 'app/common/header/header.component';
import {SidebarComponent} from "./common/sidebar/sidebar.component";


@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent, RouterLink, SidebarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  router = inject(Router);

  msgSuccess = null;
  msgInfo = null;
  msgError = null;

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const navigationState = this.router.getCurrentNavigation()?.extras.state;
        this.msgSuccess = navigationState?.['msgSuccess'] || null;
        this.msgInfo = navigationState?.['msgInfo'] || null;
        this.msgError = navigationState?.['msgError'] || null;
      }
    });
  }

}
