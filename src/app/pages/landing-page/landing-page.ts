import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PlayerService } from '../../services/player.service';
import { GameManagerService } from '../../services/game-manager.service';
import { IPlayer } from '../../models/player.interface';

@Component({
  selector: 'app-landing-page',
  imports: [RouterLink],
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss',
})
export class LandingPage {
  public readonly playerService = inject(PlayerService);
  public readonly gameManagerService = inject(GameManagerService);
  public readonly router = inject(Router);

  public initGameWithSavedPlayer(player: IPlayer): void {
    this.gameManagerService.initGame(player);
    this.router.navigateByUrl('/map');
  }
}
