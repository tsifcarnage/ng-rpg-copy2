import { Component, inject } from '@angular/core';
import { GameHeader } from '../../components/game-header/game-header';
import { PlayerSummary } from '../../components/player-summary/player-summary';
import { MapSelector } from '../../components/map-selector/map-selector';
import { ActivatedRoute } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { GameManagerService } from '../../services/game-manager.service';

@Component({
  selector: 'app-map-page',
  imports: [GameHeader, PlayerSummary, MapSelector],
  templateUrl: './map-page.html',
  styleUrl: './map-page.scss',
})
export class MapPage {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly playerService = inject(PlayerService);
  public readonly gameManagerService = inject(GameManagerService);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      const playerPseudo = params['pseudo'];
      const player = this.playerService.getUserByPseudo(playerPseudo);
      if (player) {
        this.gameManagerService.initGame(player);
        console.log('===== GAME INIT =======', player);
      } else {
        console.log('===== PLAYER NOT FOUND =======');
      }
    });
  }
}
