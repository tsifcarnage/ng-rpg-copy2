import { EnemyRaceType } from '../enums/enemy-race-type.enum';
import { EnemyKind } from '../enums/kind.enum';
import { ZoneMap } from '../enums/zone.enum';
import { IBaseEntity, IBaseInstance } from './base-entity.interface';

export interface IEnemy extends IBaseEntity {
  race: EnemyRaceType;
  xpReward: number;
  goldReward: number;
  zone: ZoneMap;
}

export interface IEnemyInstance extends IEnemy, IBaseInstance {
  kind: EnemyKind;
}
