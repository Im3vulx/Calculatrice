import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CaluletteComponent } from "./calulette/calulette.component";

@Component({
    selector: 'app-root',
    standalone: true,
    styles: ``,
    templateUrl: './app.component.html',
    imports: [CommonModule, 
      RouterOutlet, 
      RouterModule, 
      CaluletteComponent,
    ]
})
export class AppComponent {
  title = 'calculette';
}
