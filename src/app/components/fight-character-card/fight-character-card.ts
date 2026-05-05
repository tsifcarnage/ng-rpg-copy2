import { Component, input } from '@angular/core';

@Component({
  selector: 'app-fight-character-card',
  imports: [],
  templateUrl: './fight-character-card.html',
  styleUrl: './fight-character-card.scss',
})
export class FightCharacterCard {
  public readonly isPlayer = input.required<boolean>();
}
