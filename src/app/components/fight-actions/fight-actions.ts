import { Component } from '@angular/core';

interface TypeActions {
  icon: string;
  name: string;
  cost: number;
}

interface InventoryActions {
  icon: string;
  name: string;
  qty: number;
}

@Component({
  selector: 'app-fight-actions',
  imports: [],
  templateUrl: './fight-actions.html',
  styleUrl: './fight-actions.scss',
})
export class FightActions {
  public readonly typeActions: TypeActions[] = [
    { icon: '⚔️', name: 'Taillade', cost: 10 },
    { icon: '🛡️', name: 'Coup de bouclier', cost: 15 },
    { icon: '📯', name: 'Cri de guerre', cost: 20 },
  ];

  public readonly inventoryActions: InventoryActions[] = [
    { icon: '🧪', name: 'Petite potion de soin', qty: 3 },
  ];
}
