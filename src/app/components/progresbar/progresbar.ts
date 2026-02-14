import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-progresbar',
  imports: [NgFor],
  templateUrl: './progresbar.html',
  providers: [],
  styleUrl: './progresbar.css',
})
export class Progresbar {


   steps = [
    'Cuenta',
    'Perfil',
    'Confirmación',
    'Finalizado'
  ];

  currentStep = 0;

  next(): void {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  prev(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }


}
