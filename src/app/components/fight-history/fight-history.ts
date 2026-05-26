import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { LogEntry } from '../../models/log-entry.interface';

@Component({
  selector: 'app-fight-history',
  imports: [DatePipe],
  templateUrl: './fight-history.html',
  styleUrl: './fight-history.scss',
})
export class FightHistory {
  public readonly entries: LogEntry[] = [];
}
