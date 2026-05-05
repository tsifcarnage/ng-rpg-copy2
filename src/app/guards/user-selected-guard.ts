import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GameManagerService } from '../services/game-manager.service';

export const userSelectedGuard: CanActivateFn = (route, state) => {
  const manager = inject(GameManagerService);
  const router = inject(Router);

  return manager.isInit ? true : router.createUrlTree(['/landing']);
};
