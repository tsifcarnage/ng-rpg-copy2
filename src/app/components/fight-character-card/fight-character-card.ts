import { Component, computed, inject, input } from '@angular/core';
import { LowerCasePipe, TitleCasePipe } from '@angular/common';
import { GameManagerService } from '../../services/game-manager.service';
import { IconByType } from '../../enums/class-type.enum';
import { EnemyRaceType } from '../../enums/enemy-race-type.enum';
import { IEnemyInstance } from '../../models/enemy.interface';
import { InterfaceDigitsPipe } from '../../pipes/interface-digits-pipe';

const IconByRace: Record<EnemyRaceType, string> = {
  [EnemyRaceType.Goblin]: '👺',
  [EnemyRaceType.Troll]: '🧌',
  [EnemyRaceType.Loup]: '🐺',
  [EnemyRaceType.Widow]: '👰🏾',
  [EnemyRaceType.DarkMage]: '🧙🏾‍♂️',
  [EnemyRaceType.Lich]: '💀',
  [EnemyRaceType.Orc]: '😈',
  [EnemyRaceType.Dragon]: '🐉',
  [EnemyRaceType.Angular]: '🦁',
};

@Component({
  selector: 'app-fight-character-card',
  imports: [LowerCasePipe, TitleCasePipe, InterfaceDigitsPipe],
  templateUrl: './fight-character-card.html',
  styleUrl: './fight-character-card.scss',
})
export class FightCharacterCard {
  private readonly gameManagerService = inject(GameManagerService);

  public readonly isPlayer = input.required<boolean>();

  public readonly IconByType = IconByType;
  public readonly IconByRace = IconByRace;

  public readonly player = computed(() => this.gameManagerService.currentPlayer);
  public readonly enemy = computed(() => this.gameManagerService.currentEnemy);
}
