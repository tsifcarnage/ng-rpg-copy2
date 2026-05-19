import { EnemyRaceType } from '../enums/enemy-race-type.enum';
import { EnemyKind } from '../enums/kind.enum';
import { IBaseEntity, IBaseInstance } from './base-entity.interface';

export interface IEnemy extends IBaseEntity {
  race: EnemyRaceType;
}

export interface IEnemyInstance extends IEnemy, IBaseInstance {
  kind: EnemyKind;
}
