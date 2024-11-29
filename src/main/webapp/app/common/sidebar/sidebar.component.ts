import {Component, HostListener} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, NgOptimizedImage],
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  @HostListener('document:click', ['$event'])
  toggleSidebar(event: Event) {
    const button = (event.target as HTMLElement).closest('#menuToggle');
    if (button) {
      const sidebar = button.previousElementSibling;
      if (sidebar) sidebar.classList.toggle("-translate-x-full");
    }
  }
}
