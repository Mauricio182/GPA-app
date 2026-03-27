import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogRef } from '@angular/material/dialog';
import { Http } from '../../services/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-advisor-form',
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    CommonModule
  ],
  templateUrl: './edit-advisor-form.html',
  styleUrl: './edit-advisor-form.css',
})
export class EditAdvisorForm {

  adviserList: any[] = [];

  // FormControls
  selectedAdviserId = new FormControl('', Validators.required);
  name = new FormControl('', [Validators.required, Validators.minLength(3)]);
  lastName = new FormControl('', [Validators.required, Validators.minLength(3)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  rol = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  profileForm = new FormGroup({
    name: this.name,
    lastName: this.lastName,
    rol: this.rol,
    email: this.email,
    password: this.password
  });

  constructor(private _http: Http, private dialogRef: MatDialogRef<EditAdvisorForm>) {
    // Cargar la lista de asesores al iniciar el diálogo
    this._http.getAdvisers().subscribe((resp) => {
      this.adviserList = resp;
      console.log('Lista de asesores cargada:', this.adviserList);
    });
  }

  // Mensajes de error
  errorMessage(control: FormControl) {
    if (control.hasError('required')) return 'Campo requerido';
    if (control.hasError('email')) return 'Email inválido';
    return '';
  }

  // Cargar los datos del asesor seleccionado en el formulario
loadAdviser(id: string) {
  const adviser = this.adviserList.find(a => a.id === id);
  if (!adviser) return;

  // Eliminar espacios y cualquier comilla extra
  const cleanEmail = adviser.email?.trim().replace(/['"`]/g, '');

  this.profileForm.patchValue({
    name: adviser.name?.trim(),
    lastName: adviser.lastName?.trim(),
    email: cleanEmail,
    rol: adviser.rol?.trim(),
    password: adviser.password?.trim()
  });
}

  // Guardar cambios en Firebase
  editAdviser() {
    const id = this.selectedAdviserId.value;
    if (!id) return;

    if (this.profileForm.valid) {
      this._http.updateAdviser(id, this.profileForm.value)
        .subscribe(res => {
          console.log('Asesor actualizado:', res);
          this.dialogRef.close();  // cerrar diálogo después de guardar
        });
    } else {
      console.log('Formulario inválido');
    }
  }

  // Cerrar diálogo
  closeDialog() {
    this.dialogRef.close();
  }

}