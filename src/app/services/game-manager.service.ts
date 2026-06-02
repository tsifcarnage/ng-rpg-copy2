import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { IPlayer } from '../models/player.interface';
import { GameState } from '../enums/game-state.enum';
import { Random } from './random.service';
import { IEnemyInstance } from '../models/enemy.interface';
import { EnemyRaceType } from '../enums/enemy-race-type.enum';
import { delay, map, Observable, zip } from 'rxjs';
import { EntityHelper } from '../helpers/entity.helper';
import { EnemyKind } from '../enums/kind.enum';
import { LogEntryService } from './log-entry.service';

@Injectable({ providedIn: 'root' })
export class GameManagerService {
  private _currentPlayer?: IPlayer;
  private _gameState: WritableSignal<GameState> = signal(GameState.NONE);
  private _enemies: IEnemyInstance[] = [];
  private _currentEnemy?: IEnemyInstance;

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
        this._gameState.set(this.handleInitFight());
        this._gameState.set(this.handleTurnDecide());
        this.fightLoop();
      });
  }

  private systemPromptLog(): void {
    const state = this._gameState();
    this.logEntryService.addLog('system', '💻', `Nouvelle étape du jeu : ${state}`);
  }

  public handleInitFight(): GameState {
    this.systemPromptLog();
    this._currentEnemy = this._enemies.shift();
    this.logEntryService.addLog(
      'info',
      'ℹ️',
      `L'ennemi : ${this.currentEnemy.name} de niveau ${this.currentEnemy.lvl} est apparu !`,
    );
    return GameState.TURN_DECIDE;
  }

  public fightLoop(): void {
    if (this._gameState() === GameState.ENEMY_TURN) {
      this._gameState.set(this.handleEnemyTurn());
      this.applyEnemyAttack();
      if (this.checkEnd()) {
        this._gameState.set(GameState.FIGHT_END);
      } else {
        this._gameState.set(this.handlePlayerTurn());
      }
    }
  }

  public checkEnd(): boolean {
    return this._currentEnemy!.currentHp <= 0 || this._currentPlayer!.currentHp <= 0;
  }

  public applyEnemyAttack(): void {
    this._gameState.set(GameState.APPLY_EFFECT);
    this._currentPlayer!.currentHp -= this._currentEnemy!.characteristics.atk;
    this.logEntryService.addLog(
      'enemy',
      '😈',
      `Le joueur a perdu : ${this._currentEnemy!.characteristics.atk} HP`,
    );
  }

  public handleTurnDecide(): GameState {
    this.systemPromptLog();

    const turn =
      this._currentPlayer!.characteristics.speed >= this._currentEnemy!.characteristics.speed
        ? GameState.PLAYER_TURN
        : GameState.ENEMY_TURN;

    this.logEntryService.addLog(
      'system',
      '💻',
      `${turn === GameState.PLAYER_TURN ? 'Le joueur' : "l'ennemi"} commence !`,
    );
    return turn;
  }

  public handlePlayerTurn(): GameState {
    this.systemPromptLog();
    return GameState.ENEMY_TURN;
  }

  public handleEnemyTurn(): GameState {
    this.systemPromptLog();
    return GameState.APPLY_EFFECT;
  }
}
