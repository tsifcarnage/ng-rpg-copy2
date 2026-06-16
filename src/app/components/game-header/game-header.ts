import { Component, inject, input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { GameManagerService } from '../../services/game-manager.service';
import { PlayerService } from '../../services/player.service';
import { InterfaceDigitsPipe } from '../../pipes/interface-digits-pipe';

@Component({
  selector: 'app-game-header',
  imports: [RouterLink, RouterLinkActive, InterfaceDigitsPipe],
  templateUrl: './game-header.html',
  styleUrl: './game-header.scss',
})
export class GameHeader {
  public readonly router = inject(Router);
  public readonly money = input.required<number>();
  public readonly lvl = input.required<number>();
  public readonly pseudo = input.required<string>();

  public gameManager = inject(GameManagerService);
  public playerService = inject(PlayerService);

  public onSave(): void {
    this.playerService.save(this.gameManager.currentPlayer);
    alert('Jeu sauvegardé !')
  }

  public onExit(): void {
    if (
      confirm(
        'Si vous quittez maintenant toute progression non sauvegardée sera perdue. Voulez-vous continuer?',
      )
    ) {
      this.gameManager.resetGame();
      this.router.navigateByUrl('/landing');
    }
  }
}
