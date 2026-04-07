import { Component, input, Input } from '@angular/core';
import { ICharacter } from '../../models/character.interface';
import { TitleCasePipe } from '@angular/common';

@Component({
  selector: 'app-character-stats',
  imports: [TitleCasePipe],
  templateUrl: './character-stats.html',
  styleUrl: './character-stats.scss',
})
export class CharacterStats {
  public character = input.required<ICharacter>();
}
