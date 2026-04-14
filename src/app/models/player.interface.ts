import { IBaseInstance } from './base-entity.interface';
import { ICharacter } from './character.interface';

export interface IPlayer extends ICharacter, IBaseInstance {
  pseudo: string;
  money: number;
  currentXp: number;
}
