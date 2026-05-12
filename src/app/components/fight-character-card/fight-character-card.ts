import { Component, computed, inject, input } from '@angular/core';
import { LowerCasePipe, TitleCasePipe } from '@angular/common';
import { GameManagerService } from '../../services/game-manager.service';
import { IconByType } from '../../enums/class-type.enum';
import { EnemyRaceType } from '../../enums/enemy-race-type.enum';
import { IEnemyInstance } from '../../models/enemy.interface';

const IconByRace: Record<EnemyRaceType, string> = {
  [EnemyRaceType.Goblin]: '👺',
  [EnemyRaceType.Orc]: '👹',
};

const MOCK_ENEMY: IEnemyInstance = {
  name: 'Gobelin des cavernes',
  description: 'Petite créature sournoise embusquée dans les ruines.',
  race: EnemyRaceType.Goblin,
  kind: 'normal',
  lvl: 2,
  currentHp: 45,
  currentMp: 10,
  characteristics: {
    atk: 8,
    def: 4,
    speed: 12,
    hp: 60,
    mana: 20,
  },
};

@Component({
  selector: 'app-fight-character-card',
  imports: [LowerCasePipe, TitleCasePipe],
  templateUrl: './fight-character-card.html',
  styleUrl: './fight-character-card.scss',
})
export class FightCharacterCard {
  private readonly gameManagerService = inject(GameManagerService);

  public readonly isPlayer = input.required<boolean>();

  public readonly IconByType = IconByType;
  public readonly IconByRace = IconByRace;

  public readonly player = computed(() => this.gameManagerService.currentPlayer);
  public readonly enemy = MOCK_ENEMY;
}
