import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Random } from './services/random.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ng-rpg');

  private readonly randomService = inject(Random);

  constructor() {
    this.randomService.generateInteger().subscribe((response) => {
      console.log("=====> ", response.result.random.data)
    });
  }

}
