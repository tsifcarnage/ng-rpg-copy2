import { Component, input, output } from '@angular/core';
import { ZoneMap } from '../../enums/zone.enum';

interface ZoneInfo {
  id: string;
  name: string;
  description: string;
  icon: string;
  difficulty: string;
  difficultyColor: string;
  minLevel: number;
  enemies: string;
  zone: ZoneMap;
}

@Component({
  selector: 'app-map-selector',
  imports: [],
  templateUrl: './map-selector.html',
  styleUrl: './map-selector.scss',
})
export class MapSelector {
  public readonly lvl = input.required<number>();

  public readonly zoneSelected = output<ZoneInfo>();

  public readonly zones: ZoneInfo[] = [
    {
      id: 'forest',
      name: 'Forêt des Ombres',
      description: 'Une forêt mystérieuse peuplée de créatures sauvages.',
      icon: '🌲',
      difficulty: 'Facile',
      difficultyColor: '#2ecc71',
      minLevel: 1,
      enemies: 'Loups, Gobelins, Trolls',
      zone: ZoneMap.FOREST
    },
    {
      id: 'dungeon',
      name: 'Donjon Maudit',
      description: 'Un donjon sombre abritant des morts-vivants et des mages noirs.',
      icon: '🏰',
      difficulty: 'Moyen',
      difficultyColor: '#f39c12',
      minLevel: 5,
      enemies: 'Veuve, Mages Sombres, Liche',
      zone: ZoneMap.DUNGEON
    },
    {
      id: 'mountain',
      name: 'Montagnes du Chaos',
      description: 'Des sommets dangereux habités par des créatures légendaires.',
      icon: '⛰️',
      difficulty: 'Difficile',
      difficultyColor: '#e74c3c',
      minLevel: 10,
      enemies: 'Dragon, Orc des montagnes, le roi Angular',
      zone: ZoneMap.MOUNTAIN
    },
  ];
}
