import { Component } from '@angular/core';
import { IconByItemType, InventoryItemType } from '../../enums/inventory-item-type.enum';

@Component({
  selector: 'app-inventory-bag',
  imports: [],
  templateUrl: './inventory-bag.html',
  styleUrl: './inventory-bag.scss',
})
export class InventoryBag {
  public readonly inventoryTypeFilters = Object.values(InventoryItemType);
  public readonly IconByItemType = IconByItemType;
}
