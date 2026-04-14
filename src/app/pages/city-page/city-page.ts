import { Component, inject } from '@angular/core';
import { GameHeader } from '../../components/game-header/game-header';
import { GameManagerService } from '../../services/game-manager.service';

@Component({
  selector: 'app-city-page',
  imports: [GameHeader],
  templateUrl: './city-page.html',
  styleUrl: './city-page.scss',
})
export class CityPage {
  public readonly gameManagerService = inject(GameManagerService);
}
