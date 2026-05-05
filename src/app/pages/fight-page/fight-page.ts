import { Component, inject } from '@angular/core';
import { GameHeader } from '../../components/game-header/game-header';
import { GameManagerService } from '../../services/game-manager.service';

@Component({
  selector: 'app-fight-page',
  imports: [GameHeader],
  templateUrl: './fight-page.html',
  styleUrl: './fight-page.scss',
})
export class FightPage {
  public readonly gameManagerService = inject(GameManagerService);
}
