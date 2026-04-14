import { Component, inject } from '@angular/core';
import { GameHeader } from '../../components/game-header/game-header';
import { GameManagerService } from '../../services/game-manager.service';

@Component({
  selector: 'app-inventory-page',
  imports: [GameHeader],
  templateUrl: './inventory-page.html',
  styleUrl: './inventory-page.scss',
})
export class InventoryPage {
  public readonly gameManagerService = inject(GameManagerService);
}
