import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

type LogKind = 'system' | 'player' | 'enemy' | 'heal' | 'info';

interface LogEntry {
  kind: LogKind;
  icon: string;
  text: string;
  time: Date;
}

@Component({
  selector: 'app-fight-history',
  imports: [DatePipe],
  templateUrl: './fight-history.html',
  styleUrl: './fight-history.scss',
})
export class FightHistory {
  public readonly entries: LogEntry[] = [
    { kind: 'system', icon: '⚔️', text: 'Combat démarré !', time: new Date() },
    { kind: 'info', icon: '👺', text: 'Un Gobelin des cavernes surgit !', time: new Date() },
    { kind: 'player', icon: '🗡️', text: 'Vous infligez 12 dégâts au Gobelin.', time: new Date() },
    { kind: 'enemy', icon: '💢', text: 'Le Gobelin vous inflige 7 dégâts.', time: new Date() },
    { kind: 'player', icon: '⚔️', text: 'Taillade : 18 dégâts critiques !', time: new Date() },
    { kind: 'heal', icon: '🧪', text: 'Vous utilisez une potion (+25 PV).', time: new Date() },
    { kind: 'enemy', icon: '💢', text: 'Le Gobelin vous inflige 5 dégâts.', time: new Date() },
  ];
}
