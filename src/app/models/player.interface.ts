import { IBaseInstance } from './base-entity.interface';
import { ICharacter } from './character.interface';

export interface IPlayer extends ICharacter, IBaseInstance {
  pseudo: string;
  money: number;
  currentXp: number;
  /** New Game + tier. Base characteristics are scaled by 2^ascension. */
  ascension?: number;
}
