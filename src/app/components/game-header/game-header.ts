import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-game-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './game-header.html',
  styleUrl: './game-header.scss',
})
export class GameHeader {
  public readonly router = inject(Router);

  public onSave(): void {
    // handle it later
  }

  public onExit(): void {
    if (
      confirm(
        'Si vous quittez maintenant toute progression non sauvegardée sera perdue. Voulez-vous continuer?',
      )
    ) {
      this.router.navigateByUrl('/landing');
    }
  }
}
