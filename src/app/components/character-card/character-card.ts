import { Component, input, output } from '@angular/core';
import { ClassType } from '../../enums/class-type.enum';
import { ICharacter } from '../../models/character.interface';

@Component({
  selector: 'app-character-card',
  imports: [],
  templateUrl: './character-card.html',
  styleUrl: './character-card.scss',
})
export class CharacterCard {
  public readonly item = input.required<ICharacter>();

  public readonly cardSelected = output<void>();
  public readonly ClassType = ClassType;
}
