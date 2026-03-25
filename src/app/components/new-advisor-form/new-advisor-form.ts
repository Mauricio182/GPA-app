import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { Http } from '../../services/http';
import { merge } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
// import {
//   MatDialog,
//   MatDialogActions,
//   MatDialogClose,
//   MatDialogContent,
//   MatDialogTitle,
// } from '@angular/material/dialog';



@Component({
  selector: 'app-new-advisor-form',
  imports: [MatButtonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, FormsModule, MatIconModule],
  templateUrl: './new-advisor-form.html',
  styleUrl: './new-advisor-form.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewAdvisorForm {


name = new FormControl('', [Validators.required, Validators.minLength(3)]);
lastName = new FormControl('', [Validators.required, Validators.minLength(3)]);
email = new FormControl('', [Validators.required, Validators.email]);
password = new FormControl('', [Validators.required]);

profileForm = new FormGroup({
  name: this.name,
  lastName: this.lastName,
  email: this.email,
  password: this.password
});

  userForm: FormGroup | undefined;

  constructor(private _htpp: Http, private dialogRef: MatDialogRef<NewAdvisorForm>) {
 
 }

   errorMessage(control: FormControl) {
    if (control.hasError('required')) return 'Campo requerido';
    if (control.hasError('email')) return 'Email inválido';
    return '';
  }

  onSubmit() {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value);
    } else {
      console.log(' Algun campo no es valido');
    }

    this._htpp.createAdviser({
      name: this.profileForm.value.name,
      lastName: this.profileForm.value.lastName,
      email: this.profileForm.value.email,
      password: this.profileForm.value.password
    }).subscribe(res => {
    console.log('Guardado en firebase', res);

  });;
  }

    closeDialog() {
    this.dialogRef.close();
  }

// updateErrorMessage() {
//   const emailControl = this.profileForm.get('email');

//   if (emailControl?.hasError('required')) {
//     this.errorMessage.set('You must enter a value');
//   } else if (emailControl?.hasError('email')) {
//     this.errorMessage.set('Not a valid email');
//   } else {
//     this.errorMessage.set('');
//   }
// }



}
