import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { Auth } from '../services/auth';


export const adminGuard: CanActivateFn = (route, state) => {
  
  const auth = inject(Auth);
  const router = inject(Router);

  const user = auth.user();

  if (user?.es_admin) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
