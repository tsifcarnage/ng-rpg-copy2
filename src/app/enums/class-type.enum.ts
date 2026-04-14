export enum ClassType {
  Warrior = 'WARRIOR',
  Mage = 'MAGE',
  Rogue = 'ROGUE',
}

export const IconByType = {
  [ClassType.Mage]: '🔮',
  [ClassType.Warrior]: '⚔️',
  [ClassType.Rogue]: '🗡️',
}
