import { CanActivateFn } from '@angular/router';

export const verifyGuard: CanActivateFn = (route, state) => {
  console.log('guard activado', route, state)
  let isUserAuth = false

  if(isUserAuth){
    return true
  } else {
    return false
  }

};
