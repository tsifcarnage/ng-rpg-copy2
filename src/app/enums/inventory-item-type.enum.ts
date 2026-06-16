export enum InventoryItemType {
  POTION = 'potion',
  WEAPONS = 'weapons',
  ARMOUR = 'armour',
  ACCESSORY = 'accessory',
}

export const IconByItemType: Record<InventoryItemType, string> = {
  [InventoryItemType.POTION]: '🧪',
  [InventoryItemType.WEAPONS]: '🗡️',
  [InventoryItemType.ARMOUR]: '🥋',
  [InventoryItemType.ACCESSORY]: '💍',
};
