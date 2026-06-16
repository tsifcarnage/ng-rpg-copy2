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
  public readonly inventoryTypeFilters = Object.values(InventoryItemType)
  public readonly IconByItemType =IconByItemType
  public readonly bag : IInventoryItemBagInstance[] =[{
    icon:'🧪',
    rarity:'common',
    name:'Petite potion de soin',
    description:'Restore 30 PV',
    qty:3,
    type: InventoryItemType.POTION
  },{
    icon:'🗡️',
    rarity:'common',
    name:'Petite epee de debutant',
    description:'ajoute 3 atk',
    qty:3,
    type: InventoryItemType.WEAPONS
  }]
}
