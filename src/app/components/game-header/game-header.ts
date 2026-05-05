import { Component, inject, input } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { GameManagerService } from '../../services/game-manager.service';

@Component({
  selector: 'app-game-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './game-header.html',
  styleUrl: './game-header.scss',
})
export class GameHeader {
  public readonly router = inject(Router);
  public readonly money = input.required<number>();
  public readonly lvl = input.required<number>();
  public readonly pseudo = input.required<string>();

  public gameManager = inject(GameManagerService);

  public onSave(): void {
    // handle it later
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
