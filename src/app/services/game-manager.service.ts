import { inject, Injectable } from '@angular/core';
import { IPlayer } from '../models/player.interface';
import { GameState } from '../enums/game-state.enum';
import { Random } from './random.service';
import { IEnemy, IEnemyInstance } from '../models/enemy.interface';
import { ENEMY_DATA } from '../data/enemy.data';
import { EnemyRaceType } from '../enums/enemy-race-type.enum';
import { map, Observable } from 'rxjs';
import { EntityHelper } from '../helpers/entity.helper';

@Injectable({ providedIn: 'root' })
export class GameManagerService {
  private _currentPlayer?: IPlayer;
  private _gameState: GameState = GameState.NONE;
  private _enemies: IEnemyInstance[] = [];
  private _currentEnemy?: IEnemyInstance;
  private _randoms: number[] = [];

  private readonly randomService = inject(Random);

  public initGame(player: IPlayer): void {
    this._currentPlayer = player;

    this.randomService.generateInteger().subscribe((response) => {
      this._randoms = response.result.random.data;
    });
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

  public getRandomEnemiesType(): Observable<EnemyRaceType[]> {
    return this.randomService.generateInteger(5, 0, 2).pipe(
      map((value) => value.result.random.data),
      map((values) => EntityHelper.getRaceByNumbers(values)),
    );
  }

  public startFight(): void {
    this.getRandomEnemiesType().subscribe((values) => {
      console.log(values)
      this._gameState = GameState.FIGHT_INIT as GameState;
      while (this._gameState !== GameState.FIGHT_END) {
        console.log('Fight state => ', this._gameState);
        switch (this._gameState) {
          case GameState.FIGHT_INIT:
            this._currentEnemy = this._enemies.shift();
            this._gameState = GameState.TURN_DECIDE;
            break;
          case GameState.TURN_DECIDE:
            this._gameState = this.handleTurnDecide();
            break;
          case GameState.PLAYER_TURN:
            this._gameState = this.handlePlayerTurn();
            break;
          case GameState.ENEMY_TURN:
            this._gameState = this.handleEnemyTurn();
            break;
          case GameState.APPLY_EFFECT:
            this._gameState = this.handleApplyEffect();
            break;
          case GameState.CHECK_END:
            this._gameState = this.handleCheckEnd();
            break;

          default:
            this._gameState = GameState.FIGHT_END;
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
