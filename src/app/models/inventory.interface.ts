import { InventoryItemType } from '../enums/inventory-item-type.enum';

export interface IInventoryItem {
  name: string;
  description: string;
  icon: string;
  type: InventoryItemType;
  rarity: 'common' | 'rare' | 'legendary';
}

export interface IInventoryItemBagInstance extends IInventoryItem {
  qty: number;
}

// export interface IInventoryItemShopInstance extends IInventoryItem {}
