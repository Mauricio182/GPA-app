import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { Http } from '../../services/http';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-advisor-form',
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    CommonModule
  ],
  templateUrl: './delete-advisor-form.html',
  styleUrls: ['./delete-advisor-form.css'],
})
export class DeleteAdvisorForm {
  adviserList: any[] = [];

  // FormControl para el select
  name = new FormControl('', [Validators.required]);

  profileForm = new FormGroup({
    name: this.name
  });

  constructor(private _http: Http, private dialogRef: MatDialogRef<DeleteAdvisorForm>) {
    this.loadAdvisers();
  }

  loadAdvisers() {
    this._http.getAdvisers().subscribe((resp) => {
      this.adviserList = resp;
      console.log(this.adviserList);
    });
  }

  errorMessage(control: FormControl) {
    if (control.hasError('required')) return 'Campo requerido';
    return '';
  }

  deleteAdviser() {
    const id = this.name.value;
    if (!id) return;

    this._http.deleteAdviser(id).subscribe(() => {
      console.log('Asesor eliminado');
      this.name.reset();
      this.loadAdvisers(); // refresca lista
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}