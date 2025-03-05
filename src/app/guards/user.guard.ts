import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';

export const userGuard: CanActivateFn = async (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  if( await userService.checkToken()){
    return true;
  } else {
    // Redirige al login si no hay token
    router.navigate(['/login']); 
    return false;
  }
};