import { inject, Pipe, PipeTransform } from '@angular/core';
import { GameManagerService } from '../services/game-manager.service';

@Pipe({
  name: 'xpRemaining',
})
export class XpRemainingPipe implements PipeTransform {
  private readonly gameManagerService = inject(GameManagerService);

  transform(lvl: number): number {
    return this.gameManagerService.xpForNextLevel(lvl);
  }
}
