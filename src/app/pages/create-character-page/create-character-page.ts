import { Component } from '@angular/core';
import { CharacterCard } from '../../components/character-card/character-card';
import { USER_CHOICES_CLASS } from '../../data/class.data';
import { ICharacter } from '../../models/character.interface';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-create-character-page',
  imports: [CharacterCard, NgClass],
  templateUrl: './create-character-page.html',
  styleUrl: './create-character-page.scss',
})
export class CreateCharacterPage {
  public readonly data = USER_CHOICES_CLASS;

  public selectedCharacter?: ICharacter;

  public onSelect(character: ICharacter) {
    if (this.selectedCharacter?.type === character.type) {
      this.selectedCharacter = undefined;
    } else {
      this.selectedCharacter = character;
    }
  }
}
