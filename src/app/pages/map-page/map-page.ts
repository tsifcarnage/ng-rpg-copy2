import { Component, inject } from '@angular/core';
import { GameHeader } from '../../components/game-header/game-header';
import { PlayerSummary } from '../../components/player-summary/player-summary';
import { MapSelector } from '../../components/map-selector/map-selector';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { GameManagerService } from '../../services/game-manager.service';

@Component({
  selector: 'app-map-page',
  imports: [GameHeader, PlayerSummary, MapSelector],
  templateUrl: './map-page.html',
  styleUrl: './map-page.scss',
})
export class MapPage {
  public readonly gameManagerService = inject(GameManagerService);
  public readonly router = inject(Router);

  public redirectToFight(event: any): void {
    this.router.navigateByUrl('/fight');
  }
}
