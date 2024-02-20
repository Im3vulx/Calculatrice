import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  styles: ``,
  template: `<div class="flex gap-2 bg-slate-400 p-2">
    <a routerLink="/calculette">Saisie</a>
    <a routerLink="/inventaire">Inventaires</a>
  </div>
  <router-outlet/>
  `,
  imports: [CommonModule, RouterOutlet, RouterModule],
})
export class AppComponent {
  title = 'calculette';
}
