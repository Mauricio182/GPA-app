import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

export const verifyGuard: CanActivateFn = (route, state) => {
  // console.log('guard activado', route, state)
  // let isUserAuth = false
  // let router:Router = new Router()

  // if(isUserAuth){
  //   return true
  // } else {
  //   router.navigate(['no-auth'])
  //   return false
  // }
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isAuthenticated()) {
    router.navigate(['/home-login']);
    return false;
  }

  return true;
};
