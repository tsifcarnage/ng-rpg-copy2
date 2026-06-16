import { Component, inject } from '@angular/core';
import { GameHeader } from '../../components/game-header/game-header';
import { GameManagerService } from '../../services/game-manager.service';
import { FightCharacterCard } from '../../components/fight-character-card/fight-character-card';
import { FightHistory } from '../../components/fight-history/fight-history';
import { FightActions } from '../../components/fight-actions/fight-actions';
import { GameState } from '../../enums/game-state.enum';
import { LogEntryService } from '../../services/log-entry.service';
import { ActivatedRoute } from '@angular/router';
import { ZoneMap } from '../../enums/zone.enum';

@Component({
  selector: 'app-fight-page',
  imports: [GameHeader, FightCharacterCard, FightHistory, FightActions],
  templateUrl: './fight-page.html',
  styleUrl: './fight-page.scss',
})
export class FightPage {
  public readonly gameManagerService = inject(GameManagerService);
  public readonly logEntryService = inject(LogEntryService);
  public readonly activatedRoute = inject(ActivatedRoute);
  public readonly GameState = GameState;

  constructor() {
    const zone: ZoneMap = this.activatedRoute.snapshot.params['zone']
    this.gameManagerService.startFight(zone);
  }
}
