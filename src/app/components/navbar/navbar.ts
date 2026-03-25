import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { CommonModule, UpperCasePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  currentUser: any
  constructor(private _auth: AuthService, private router: Router){
this.currentUser= this._auth.currentUser

console.warn('valor del current user',this._auth.currentUser.nombre)
  }

singOut(){
  this._auth.logout()
  this.router.navigate(['/home-login']);
}

}
