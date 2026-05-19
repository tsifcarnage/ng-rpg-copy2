import { EnemyRaceType } from '../enums/enemy-race-type.enum';
import { IEnemy } from '../models/enemy.interface';

export const ENEMY_DATA: IEnemy[] = [
  {
    name: 'Gobelin de malheur',
    description: 'Petite créature verte, rapide et sournoise.',
    characteristics: {
      atk: 2,
      def: 3,
      speed: 12,
      hp: 30,
      mana: 0,
    },
    race: EnemyRaceType.Goblin,
  },
  {
    name: 'Troll',
    description: 'Gros monstre avec une force brute, mais lent et particulièrement bête.',
    characteristics: {
      atk: 15,
      def: 10,
      speed: 5,
      hp: 80,
      mana: 0,
    },
    race: EnemyRaceType.Troll,
  },
  {
    name: 'Loup',
    description: 'Animal sauvage rapide et agressif.',
    characteristics: {
      atk: 8,
      def: 8,
      speed: 15,
      hp: 50,
      mana: 0,
    },
    race: EnemyRaceType.Loup,
  },
];
