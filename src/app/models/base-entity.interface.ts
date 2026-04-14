export interface IBaseEntity {
  characteristics: ICharacteristics;
  name: string;
  description: string;
}

export interface IBaseInstance {
  lvl: number;
  currentHp: number;
  currentMp: number;
}

export interface ICharacteristics {
  atk: number;
  def: number;
  speed: number;
  hp: number;
  mana: number;
}
