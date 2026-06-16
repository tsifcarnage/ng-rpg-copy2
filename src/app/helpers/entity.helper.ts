import { ENEMY_DATA } from '../data/enemy.data';
import { EnemyRaceType } from '../enums/enemy-race-type.enum';
import { EnemyKind } from '../enums/kind.enum';
import { ZoneMap } from '../enums/zone.enum';
import { IEnemy, IEnemyInstance } from '../models/enemy.interface';

export class EntityHelper {
  private static _enemiesTemplate: IEnemy[] = ENEMY_DATA;

  private static BOSS_RATIO = 2;
  private static ELITE_RATIO = 1.3;

  public static RatioMap: Record<EnemyKind, number> = {
    [EnemyKind.NORMAL]: 1,
    [EnemyKind.ELITE]: EntityHelper.ELITE_RATIO,
    [EnemyKind.BOSS]: EntityHelper.BOSS_RATIO,
  };

  public static KindMap: Record<number, EnemyKind> = {
    0: EnemyKind.NORMAL,
    1: EnemyKind.ELITE,
    2: EnemyKind.BOSS,
  };

  public static RaceMap: Record<number, EnemyRaceType> = {
    0: EnemyRaceType.Goblin,
    1: EnemyRaceType.Troll,
    2: EnemyRaceType.Loup,
  };
  public static RaceMapDungeon: Record<number, EnemyRaceType> = {
    0: EnemyRaceType.Widow,
    1: EnemyRaceType.DarkMage,
    2: EnemyRaceType.Lich,
  };
  public static RaceMapMountain: Record<number, EnemyRaceType> = {
    0: EnemyRaceType.Angular,
    1: EnemyRaceType.Dragon,
    2: EnemyRaceType.Orc,
  };
  public static getRaceByNumbersAndZone(arr: number[], zone: ZoneMap): EnemyRaceType[] {
    switch (zone) {
      case ZoneMap.FOREST:
        return arr.map((n) => EntityHelper.RaceMap[n] ?? EnemyRaceType.Goblin);
      case ZoneMap.DUNGEON:
        return arr.map((n) => EntityHelper.RaceMapDungeon[n] ?? EnemyRaceType.Widow);
      case ZoneMap.MOUNTAIN:
        return arr.map((n) => EntityHelper.RaceMapMountain[n] ?? EnemyRaceType.Orc);
      default:
        return [];
    }
  }

  public static getKindByNumbers(arr: number[]): EnemyKind[] {
    return arr.map((n) => EntityHelper.KindMap[n] ?? EnemyKind.NORMAL);
  }

  public static enemyRaceToInstance(race: EnemyRaceType, kind: EnemyKind): IEnemyInstance {
    const template = EntityHelper._enemiesTemplate.find((template) => template.race === race)!;

    const ratio = EntityHelper.RatioMap[kind];

    return {
      ...template,
      characteristics: {
        atk: template.characteristics.atk * ratio,
        def: template.characteristics.def * ratio,
        speed: template.characteristics.speed * ratio,
        hp: template.characteristics.hp * ratio,
        mana: template.characteristics.mana * ratio,
      },
      currentHp: template.characteristics.hp * ratio,
      currentMp: template.characteristics.mana * ratio,
      lvl: 1,
      kind: kind,
      goldReward: template.goldReward * ratio,
      xpReward: template.xpReward * ratio,
    };
  }
}
