import { Component, input } from '@angular/core';
import { IPlayer } from '../../models/player.interface';
import { IconByType } from '../../enums/class-type.enum';
import { InterfaceDigitsPipe } from '../../pipes/interface-digits-pipe';

@Component({
  selector: 'app-player-inventory-summary',
  imports: [InterfaceDigitsPipe],
  templateUrl: './player-inventory-summary.html',
  styleUrl: './player-inventory-summary.scss',
})
export class PlayerInventorySummary {
  public readonly player = input.required<IPlayer>();
  public readonly IconByType = IconByType;
}
