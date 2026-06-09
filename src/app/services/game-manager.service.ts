import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { IPlayer } from '../models/player.interface';
import { GameState } from '../enums/game-state.enum';
import { Random } from './random.service';
import { IEnemyInstance } from '../models/enemy.interface';
import { EnemyRaceType } from '../enums/enemy-race-type.enum';
import { map, Observable, zip } from 'rxjs';
import { EntityHelper } from '../helpers/entity.helper';
import { EnemyKind } from '../enums/kind.enum';
import { LogEntryService } from './log-entry.service';

@Injectable({ providedIn: 'root' })
export class GameManagerService {
  private _currentPlayer?: IPlayer;
  private _gameState: WritableSignal<GameState> = signal(GameState.NONE);
  private _enemies: IEnemyInstance[] = [];
  private _currentEnemy: WritableSignal<IEnemyInstance|undefined> = signal(undefined);

  private readonly randomService = inject(Random);
  private readonly logEntryService = inject(LogEntryService);

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
    return this._currentEnemy()!;
  }

  public get state(): WritableSignal<GameState> {
    return this._gameState!;
  }

  private getRandomEnemiesType(): Observable<EnemyRaceType[]> {
    return this.randomService
      .generateIntegerAndGetData(5, 0, 2)
      .pipe(map((values) => EntityHelper.getRaceByNumbers(values)));
  }

  private getRandomEnemiesKind(): Observable<EnemyKind[]> {
    return this.randomService
      .generateIntegerAndGetData(5, 1, 2)
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
        this.startNewFight();
      });
  }

  private startNewFight(): void {
    this._gameState.set(this.handleInitFight());
    this._gameState.set(this.handleTurnDecide());
    if (this._gameState() === GameState.ENEMY_TURN) {
      this.fightLoop();
    }
  }

  private handleInitFight(): GameState {
    this._currentEnemy.set(this._enemies.shift());
    this.logEntryService.addLog(
      'info',
      'ℹ️',
      `L'ennemi : ${this.currentEnemy.name} de niveau ${this.currentEnemy.lvl} est apparu !`,
    );
    return GameState.TURN_DECIDE;
  }

  public fightLoop(): void {
    if (this._gameState() === GameState.ENEMY_TURN) {
      this.applyEnemyAttack();
      if (this.checkEnd()) {
        this._gameState.set(GameState.FIGHT_END);
        this.logFightEnd(false);
      } else {
        this._gameState.set(GameState.PLAYER_TURN);
        this.logEntryService.addLog('system', '💻', `À vous de jouer !`);
      }
    } else if (this._gameState() === GameState.PLAYER_TURN) {
      this.applyPlayerAttack();
      if (this.checkEnd()) {
        this._gameState.set(GameState.FIGHT_END);
        this.logFightEnd(true);
        if(this._enemies.length >= 1) {
          this.startNewFight();
        } else {
          this._gameState.set(GameState.NONE);
        }
      } else {
        setTimeout(() => {
          this._gameState.set(GameState.ENEMY_TURN);
          this.logEntryService.addLog('system', '💻', `Au tour de l'ennemi !`);
          this.fightLoop();
        }, 500);
      }
    }
  }

  private logFightEnd(playerWon: boolean): void {
    this.logEntryService.addLog(
      'system',
      '☠️',
      playerWon
        ? `Victoire ${this._currentEnemy()!.name} a été vaincu`
        : `Défaite... ${this._currentPlayer!.name} est tombé au combat !`,
    );
  }

  private checkEnd(): boolean {
    return this._currentEnemy()!.currentHp <= 0 || this._currentPlayer!.currentHp <= 0;
  }

  private applyEnemyAttack(): void {
    this._gameState.set(GameState.APPLY_EFFECT);
    const atk = this.checkEnemyDamage();

    this._currentPlayer!.currentHp -= atk;

    this.logEntryService.addLog('enemy', '😈', `Le joueur a perdu : ${atk} HP`);
  }

  private applyPlayerAttack(): void {
    this._gameState.set(GameState.APPLY_EFFECT);
    const atk = this.checkPlayerDamage();

    this._currentEnemy()!.currentHp -= atk;

    this.logEntryService.addLog('player', '🧑‍🦲', `Le joueur inflige : ${atk} HP`);
  }

  private checkEnemyDamage(): number {
    const atk = this._currentEnemy()!.characteristics.atk;
    if (this._currentPlayer!.characteristics.def > atk) {
      return atk / 2;
    } else {
      return atk;
    }
  }

  private checkPlayerDamage(): number {
    const def = this._currentEnemy()!.characteristics.def;
    const atk = this._currentPlayer!.characteristics.atk;

    if (atk < def) {
      return atk / 2;
    } else {
      return atk;
    }
  }

  private handleTurnDecide(): GameState {
    const turn =
      this._currentPlayer!.characteristics.speed >= this._currentEnemy()!.characteristics.speed
        ? GameState.PLAYER_TURN
        : GameState.ENEMY_TURN;

    this.logEntryService.addLog(
      'system',
      '💻',
      `${turn === GameState.PLAYER_TURN ? 'Le joueur' : "l'ennemi"} commence !`,
    );
    return turn;
  }
}
