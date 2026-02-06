import { Component } from '@angular/core';

import { RouterModule, RouterOutlet } from '@angular/router';
import { CaluletteComponent } from "./calulette/calulette.component";

@Component({
    selector: 'app-root',
    styles: ``,
    templateUrl: './app.component.html',
    imports: [RouterOutlet, RouterModule, CaluletteComponent]
})
export class AppComponent {
  title = 'calculette';
}
