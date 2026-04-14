import { EnemyRaceType } from '../enums/enemy-race-type.enum';
import { IBaseEntity, IBaseInstance } from './base-entity.interface';

export interface IEnemy extends IBaseEntity, IBaseInstance {
  kind: 'normal' | 'elite' | 'boss';
  race: EnemyRaceType;
}
