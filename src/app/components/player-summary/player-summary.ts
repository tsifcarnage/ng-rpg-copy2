import { Component, inject, input } from '@angular/core';
import { IPlayer } from '../../models/player.interface';
import { IconByType } from '../../enums/class-type.enum';
import { InterfaceDigitsPipe } from '../../pipes/interface-digits-pipe';
import { GameManagerService } from '../../services/game-manager.service';
import { XpRemainingPipe } from '../../pipes/xp-remaining-pipe';

@Component({
  selector: 'app-player-summary',
  imports: [InterfaceDigitsPipe, XpRemainingPipe],
  templateUrl: './player-summary.html',
  styleUrl: './player-summary.scss',
})
export class PlayerSummary {
  public readonly player = input.required<IPlayer>();
  public readonly IconByType = IconByType;

  public readonly gameManagerService = inject(GameManagerService)
}
