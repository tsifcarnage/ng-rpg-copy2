import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-fight-history',
  imports: [DatePipe],
  templateUrl: './fight-history.html',
  styleUrl: './fight-history.scss',
})
export class FightHistory {
  public now = new Date();
}
