import { CanActivateFn, Router } from '@angular/router';

export const verifyGuard: CanActivateFn = (route, state) => {
  console.log('guard activado', route, state)
  let isUserAuth = false
  let router:Router = new Router()

  if(isUserAuth){
    return true
  } else {
    router.navigate(['no-auth'])
    return false
  }

};
