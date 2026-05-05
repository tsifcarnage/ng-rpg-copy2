import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { GameManagerService } from '../services/game-manager.service';

export const userNotSelectedGuard: CanActivateFn = (route, state) => {
  const manager = inject(GameManagerService);
  const router = inject(Router);

  return !manager.isInit ? true : router.createUrlTree(['/map']);
};
