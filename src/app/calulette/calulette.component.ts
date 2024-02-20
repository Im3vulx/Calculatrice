import { FormsModule } from '@angular/forms';
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Calcul {
  titre: string;
  resultat: string;
  unite: string;
}

@Component({
  selector: 'app-calulette',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './calulette.component.html',
  styleUrls: ['./calulette.component.scss']
})
export class CaluletteComponent {
  calcule = '';
  total = '0';
  produit = '';
  unite = 'm²';
  listeCalculs: Calcul[] = [];

  isCalculatorVisible = true;
  isInventoryVisible = true;

  toggleCalculatorVisibility() {
    this.isCalculatorVisible = true;
    this.isInventoryVisible = false;
  }

  toggleInventoryVisibility() {
    this.isCalculatorVisible = false;
    this.isInventoryVisible = true;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isInventoryVisible = window.innerWidth > 768;
  }

  constructor() {
    const storedCalculs = localStorage.getItem('calculs');
    this.listeCalculs = storedCalculs ? JSON.parse(storedCalculs) : [];
  }

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
      const elementExist = this.listeCalculs.find(item => item.titre === this.produit);
      if (elementExist) {
        // L'élément existe déjà, nous le mettons à jour
        this.updateElement(elementExist);
      } else {
        // L'élément n'existe pas encore, nous l'ajoutons à la liste
        this.listeCalculs.push({ titre: this.produit, resultat: this.total, unite: this.unite });
      }

      this.updateLocalStorageAndResetFields();
    }
  }

  selectionnerElement(calcul: Calcul) {
    this.produit = calcul.titre;
    this.calcule = calcul.resultat;
    this.unite = calcul.unite;
  }

  private updateElement(existingElement: Calcul) {
    existingElement.resultat = this.total;
    existingElement.unite = this.unite;
  }

  private updateLocalStorageAndResetFields() {
    localStorage.setItem('calculs', JSON.stringify(this.listeCalculs));
    this.resetFields();
  }

  private resetFields() {
    this.produit = '';
    this.calcule = '';
    this.total = '';
    this.unite = 'm²';
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.parseCSV(file);
    }
  }

  parseCSV(file: File) {
    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = () => {
      const csvData: string = reader.result as string;
      const lines: string[] = csvData.split('\n');
      
      lines.shift();

      lines.forEach((line, index) => {
        const columns: string[] = line.split(',');
        if (columns.length === 3) {
          const titre: string = columns[0];
          const resultat: string = columns[1];
          const unite: string = columns[2];
          this.listeCalculs.push({ titre, resultat, unite });
        } else {
          alert(`Le CSV est mal formatée.`);
        }
      });
      this.updateLocalStorageAndResetFields();
    };

    reader.onerror = () => {
      alert('Erreur de lecture du fichier.');
    };
  }

  exportToCSV() {
  // Nom des colonnes dans le fichier CSV
  const csvHeader = ['Titre', 'Quantité', 'Unité'];

  // Contenu des lignes du fichier CSV
  const csvData = this.listeCalculs.map(calcul => [calcul.titre, calcul.resultat, calcul.unite].join(','));

  // Contenu final du fichier CSV
  const csvContent = [csvHeader.join(','), ...csvData].join('\n');

  // Création d'un objet Blob pour télécharger le fichier CSV
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // Création d'un objet URL à partir du Blob
  const url = URL.createObjectURL(blob);

  // Création d'un élément d'ancrage invisible pour le téléchargement
  const a = document.createElement('a');
  a.setAttribute('style', 'display:none');
  document.body.appendChild(a);

  // Attribution de l'URL au lien d'ancrage
  a.href = url;

  // Spécification du nom du fichier CSV à télécharger
  a.download = 'liste_calculs.csv';

  // Clic sur le lien d'ancrage pour déclencher le téléchargement
  a.click();

  // Nettoyage
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

}
