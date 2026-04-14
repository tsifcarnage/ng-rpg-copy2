import { Component, input } from '@angular/core';
import { IPlayer } from '../../models/player.interface';
import { IconByType } from '../../enums/class-type.enum';

@Component({
  selector: 'app-player-summary',
  imports: [],
  templateUrl: './player-summary.html',
  styleUrl: './player-summary.scss',
})
export class PlayerSummary {
  public readonly player = input.required<IPlayer>();
  public readonly IconByType = IconByType;
}
