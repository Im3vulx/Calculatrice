import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calulette',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './calulette.component.html',
  styleUrl: './calulette.component.scss'
})
export class CaluletteComponent {
  calcule: string = '';
  total: string = '';
  produit: string = '';
  unite: string = '';
  listeCalculs: { titre: string, resultat: string, unite: string }[] = [];

  onButtonClicked(buttonText: string) {
    if (buttonText === '=') {
      try {
        this.total = eval(this.calcule);
      } catch (error) {
        this.total = 'Error';
      }
    } else if (buttonText === 'AC') {
      this.calcule = '';
      this.total = '';
    } else {
      this.calcule += buttonText;
    }
  }

  ajouterALaListe() {
    if (this.produit && this.calcule && this.total && this.unite) {
      this.listeCalculs.push({ titre: this.produit, resultat: this.total, unite: this.unite });
      this.produit = '';
      this.calcule = '';
      this.total = '';
      this.unite = ''; 
    }
  }
}
