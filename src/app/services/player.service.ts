import { Injectable } from '@angular/core';
import { IPlayer } from '../models/player.interface';

@Injectable({ providedIn: 'root' })
export class PlayerService {
  private readonly PLAYER_KEY = 'PLAYER_KEY';

  public add(player: IPlayer): void {
    const currentPlayers = this.retrievePlayers();
    const exist = this.getUserByPseudo(player.pseudo);

    if (!exist) {
      currentPlayers.push(player);

      try {
        const toSave = JSON.stringify(currentPlayers);
        localStorage.setItem(this.PLAYER_KEY, toSave);
      } catch (error) {
        console.error(error);
      }
    }
  }

  private retrievePlayers(): IPlayer[] {
    const currentPlayersStr = localStorage.getItem(this.PLAYER_KEY);
    if (currentPlayersStr) {
      try {
        return JSON.parse(currentPlayersStr) as IPlayer[];
      } catch (error) {
        console.error(error);
      }
    }
    return [];
  }

  public getUserByPseudo(pseudo: string): IPlayer | undefined {
    return this.retrievePlayers().find((p) => p.pseudo === pseudo);
  }

  public get hasPlayerCreated(): boolean {
    return this.retrievePlayers().length > 0;
  }

  public save() {}
  public delete() {}
}
