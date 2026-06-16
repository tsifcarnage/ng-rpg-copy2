import { EnemyRaceType } from '../enums/enemy-race-type.enum';
import { ZoneMap } from '../enums/zone.enum';
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
    xpReward: 100,
    goldReward: 10,
    zone:ZoneMap.FOREST
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
    xpReward: 250,
    goldReward: 50,
    zone:ZoneMap.FOREST
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
    xpReward: 125,
    goldReward: 25,
    zone:ZoneMap.FOREST
  },
  {
    name: 'Veuve',
    description: 'Veuve perdu à la recherche de son mari',
    characteristics: {
      atk: 20,
      def: 12,
      speed: 25,
      hp: 70,
      mana: 10,
    },
    race: EnemyRaceType.Widow,
    xpReward: 125,
    goldReward: 500,
    zone:ZoneMap.DUNGEON
  },
  {
    name: 'Mage noir',
    description: 'Un magicien corrompu',
    characteristics: {
      atk: 42,
      def: 12,
      speed: 25,
      hp: 20,
      mana: 10,
    },
    race: EnemyRaceType.DarkMage,
    xpReward: 375,
    goldReward: 200,
    zone:ZoneMap.DUNGEON
  },
  {
    name: 'Liche',
    description: 'Mage Squellettique ',
    characteristics: {
      atk: 52,
      def: 24,
      speed: 5,
      hp: 200,
      mana: 0,
    },
    race: EnemyRaceType.Lich,
    xpReward: 375,
    goldReward: 200,
    zone:ZoneMap.DUNGEON
  },
  {
    name: 'Orc',
    description: 'Orc des montagne costaud.',
    characteristics: {
      atk: 57,
      def: 0,
      speed: 5,
      hp: 300,
      mana: 0,
    },
    race: EnemyRaceType.Orc,
    xpReward: 525,
    goldReward: 290,
    zone: ZoneMap.MOUNTAIN,
  },
  {
    name: 'Dragon',
    description: 'Dragon surpuissant',
    characteristics: {
      atk: 100,
      def: 0,
      speed: 25,
      hp: 500,
      mana: 0,
    },
    race: EnemyRaceType.Dragon,
    xpReward: 125,
    goldReward: 300,
    zone:ZoneMap.MOUNTAIN
  },
  {
    name: 'Roi angular',
    description: 'Roi ultime',
    characteristics: {
      atk: 1000,
      def: 1000,
      speed: 100,
      hp: 5000,
      mana: 0,
    },
    race: EnemyRaceType.Angular,
    xpReward: 10000,
    goldReward: 10000,
    zone:ZoneMap.MOUNTAIN
  },
];
