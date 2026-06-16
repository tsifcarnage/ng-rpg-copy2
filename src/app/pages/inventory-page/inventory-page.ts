import { Component, inject } from '@angular/core';
import { GameHeader } from '../../components/game-header/game-header';
import { GameManagerService } from '../../services/game-manager.service';
import { PlayerSummary } from '../../components/player-summary/player-summary';
import { PlayerInventorySummary } from '../../components/player-inventory-summary/player-inventory-summary';
import { InventoryBag } from '../../components/inventory-bag/inventory-bag';

@Component({
  selector: 'app-inventory-page',
  imports: [GameHeader, PlayerInventorySummary, InventoryBag],
  templateUrl: './inventory-page.html',
  styleUrl: './inventory-page.scss',
})
export class InventoryPage {
  public readonly gameManagerService = inject(GameManagerService);
}
