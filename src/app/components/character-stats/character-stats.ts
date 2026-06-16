import { Component, input, Input } from '@angular/core';
import { ICharacter } from '../../models/character.interface';
import { TitleCasePipe } from '@angular/common';
import { InterfaceDigitsPipe } from '../../pipes/interface-digits-pipe';

@Component({
  selector: 'app-character-stats',
  imports: [TitleCasePipe, InterfaceDigitsPipe],
  templateUrl: './character-stats.html',
  styleUrl: './character-stats.scss',
})
export class CharacterStats {
  public character = input.required<ICharacter>();
  public showDefaultTitle = input(true);
}
