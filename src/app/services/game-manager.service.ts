import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { IPlayer } from '../models/player.interface';
import { GameState } from '../enums/game-state.enum';
import { Random } from './random.service';
import { IEnemyInstance } from '../models/enemy.interface';
import { EnemyRaceType } from '../enums/enemy-race-type.enum';
import { map, Observable, zip } from 'rxjs';
import { EntityHelper } from '../helpers/entity.helper';
import { EnemyKind } from '../enums/kind.enum';

@Injectable({ providedIn: 'root' })
export class GameManagerService {
  private _currentPlayer?: IPlayer;
  private _gameState: WritableSignal<GameState> = signal(GameState.NONE);
  private _enemies: IEnemyInstance[] = [];
  private _currentEnemy?: IEnemyInstance;

  private readonly randomService = inject(Random);

  public initGame(player: IPlayer): void {
    this._currentPlayer = player;
  }

  public resetGame(): void {
    this._currentPlayer = undefined;
  }

  public get isInit(): boolean {
    return !!this._currentPlayer;
  }

  public get currentPlayer(): IPlayer {
    return this._currentPlayer!;
  }

  public get currentEnemy(): IEnemyInstance {
    return this._currentEnemy!;
  }

  public get state(): WritableSignal<GameState> {
    return this._gameState!;
  }

  public getRandomEnemiesType(): Observable<EnemyRaceType[]> {
    return this.randomService
      .generateIntegerAndGetData(5, 0, 2)
      .pipe(map((values) => EntityHelper.getRaceByNumbers(values)));
  }

  public getRandomEnemiesKind(): Observable<EnemyKind[]> {
    return this.randomService
      .generateIntegerAndGetData(5, 0, 2)
      .pipe(map((values) => EntityHelper.getKindByNumbers(values)));
  }

  public startFight(): void {
    const type$ = this.getRandomEnemiesType();
    const kind$ = this.getRandomEnemiesKind();

    zip(type$, kind$)
      .pipe(
        map(([type, kind]) => ({
          type,
          kind,
        })),
      )
      .subscribe((values) => {
        this._enemies = values.type.map((type, i) =>
          EntityHelper.enemyRaceToInstance(type, values.kind[i]),
        );

        this._gameState.set(GameState.FIGHT_INIT as GameState);

        while (this._gameState() !== GameState.FIGHT_END) {
          console.log('Fight state => ', this._gameState);
          switch (this._gameState()) {
            case GameState.FIGHT_INIT:
              this._currentEnemy = this._enemies.shift();
              this._gameState.set(GameState.TURN_DECIDE);
              break;
            case GameState.TURN_DECIDE:
              this._gameState.set(this.handleTurnDecide());
              break;
            case GameState.PLAYER_TURN:
              this._gameState.set(this.handlePlayerTurn());
              break;
            case GameState.ENEMY_TURN:
              this._gameState.set(this.handleEnemyTurn());
              break;
            case GameState.APPLY_EFFECT:
              this._gameState.set(this.handleApplyEffect());
              break;
            case GameState.CHECK_END:
              this._gameState.set(this.handleCheckEnd());
              break;

            default:
              this._gameState.set(GameState.FIGHT_END);
              break;
          }
        }
      });
  }

  public handleTurnDecide(): GameState {
    return this._currentPlayer!.characteristics.speed >= this._currentEnemy!.characteristics.speed
      ? GameState.PLAYER_TURN
      : GameState.ENEMY_TURN;
  }

  public handlePlayerTurn(): GameState {
    return GameState.ENEMY_TURN;
  }

  public handleEnemyTurn(): GameState {
    return GameState.APPLY_EFFECT;
  }

  public handleApplyEffect(): GameState {
    return GameState.CHECK_END;
  }

  public handleCheckEnd(): GameState {
    return GameState.FIGHT_END;
  }
}
