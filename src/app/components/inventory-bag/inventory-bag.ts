import { Component } from '@angular/core';
import { IconByItemType, InventoryItemType } from '../../enums/inventory-item-type.enum';
import { IInventoryItemBagInstance } from '../../models/inventory.interface';

@Component({
  selector: 'app-inventory-bag',
  imports: [],
  templateUrl: './inventory-bag.html',
  styleUrl: './inventory-bag.scss',
})
export class InventoryBag {
  public readonly inventoryTypeFilters = Object.values(InventoryItemType);
  public readonly IconByItemType = IconByItemType;

  public readonly bag: IInventoryItemBagInstance[] = [
    {
      icon: '🧪',
      rarity: 'common',
      name: 'Petite potion de soin',
      description: 'Restaure 30 pv',
      qty: 3,
      type: InventoryItemType.POTION,
    },
    {
      icon: '🗡️',
      rarity: 'rare',
      name: 'Petite épée de débutant',
      description: 'Ajoute 3 atk',
      qty: 1,
      type: InventoryItemType.WEAPONS,
    },
    {
      icon: '🥋',
      rarity: 'legendary',
      name: 'Armure du légendaire Roi Angular',
      description: 'Immunise contre tous les dégats',
      qty: 1,
      type: InventoryItemType.ACCESSORY,
    },
  ];
}
