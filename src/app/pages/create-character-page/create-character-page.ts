import { Component, inject } from '@angular/core';
import { CharacterCard } from '../../components/character-card/character-card';
import { USER_CHOICES_CLASS } from '../../data/class.data';
import { ICharacter } from '../../models/character.interface';
import { NgClass } from '@angular/common';
import { CharacterStats } from '../../components/character-stats/character-stats';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { IPlayer } from '../../models/player.interface';

@Component({
  selector: 'app-create-character-page',
  imports: [CharacterCard, CharacterStats, ReactiveFormsModule, NgClass],
  templateUrl: './create-character-page.html',
  styleUrl: './create-character-page.scss',
})
export class CreateCharacterPage {
  public readonly data = USER_CHOICES_CLASS;
  public readonly nameFormControl = new FormControl('', [Validators.required]);
  public readonly router = inject(Router);
  public readonly playerService = inject(PlayerService);

  public selectedCharacter?: ICharacter;

  public onSelect(character: ICharacter) {
    if (this.selectedCharacter?.type === character.type) {
      this.selectedCharacter = undefined;
    } else {
      this.selectedCharacter = character;
    }
  }

  public createCharacter(): void {
    if (this.nameFormControl.valid && this.selectedCharacter) {
      const player: IPlayer = {
        ...this.selectedCharacter,
        pseudo: this.nameFormControl.value!,
        lvl: 1,
        currentXp: 0,
        currentHp: this.selectedCharacter.characteristics.hp,
        currentMp: this.selectedCharacter.characteristics.mana,
        money: 50,
      };

      this.playerService.add(player);
      this.router.navigateByUrl(`/map/${player.pseudo}`);
    }
  }
}
