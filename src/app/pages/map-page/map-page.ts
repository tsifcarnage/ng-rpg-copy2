import { Component } from '@angular/core';
import { GameHeader } from "../../components/game-header/game-header";
import { PlayerSummary } from '../../components/player-summary/player-summary';
import { MapSelector } from "../../components/map-selector/map-selector";

@Component({
  selector: 'app-map-page',
  imports: [GameHeader, PlayerSummary, MapSelector],
  templateUrl: './map-page.html',
  styleUrl: './map-page.scss',
})
export class MapPage {

}
