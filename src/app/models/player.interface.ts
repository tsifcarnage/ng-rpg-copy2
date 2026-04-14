import { ICharacter } from "./character.interface";

export interface IPlayer extends ICharacter {
  pseudo: string;
  lvl: number;
  currentHp:number;
  currentMp: number;
  currentXp: number;
  money: number;
}
