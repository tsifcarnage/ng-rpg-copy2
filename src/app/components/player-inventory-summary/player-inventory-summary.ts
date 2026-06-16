import { Component, input } from '@angular/core';
import { CharacterStats } from "../character-stats/character-stats";
import { IPlayer } from '../../models/player.interface';
import { InterfaceDigitsPipe } from '../../pipes/interface-digits-pipe';

@Component({
  selector: 'app-player-inventory-summary',
  imports: [CharacterStats, InterfaceDigitsPipe],
  templateUrl: './player-inventory-summary.html',
  styleUrl: './player-inventory-summary.scss',
})
export class PlayerInventorySummary {
  public player = input.required<IPlayer>()
}
