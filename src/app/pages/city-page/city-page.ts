import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { GameHeader } from '../../components/game-header/game-header';
import { GameManagerService } from '../../services/game-manager.service';
import { PlayerService } from '../../services/player.service';
import { InterfaceDigitsPipe } from '../../pipes/interface-digits-pipe';
import { USER_CHOICES_CLASS } from '../../data/class.data';
import { ICharacter } from '../../models/character.interface';
import { ICharacteristics } from '../../models/base-entity.interface';
import { IPlayer } from '../../models/player.interface';
import { IconByType } from '../../enums/class-type.enum';

interface ShopItem {
  id: string;
  icon: string;
  name: string;
  desc: string;
  cost: number;
  stat: keyof ICharacteristics;
  statLabel: string;
  amount: number;
}
interface Toast {
  msg: string;
  ok: boolean;
}

@Component({
  selector: 'app-city-page',
  imports: [GameHeader, InterfaceDigitsPipe],
  templateUrl: './city-page.html',
  styleUrl: './city-page.scss',
})
export class CityPage {
  public readonly gameManagerService = inject(GameManagerService);
  private readonly playerService = inject(PlayerService);
  private readonly router = inject(Router);

  protected readonly IconByType = IconByType;

  // ─── Boutique ─────────────────────────────────────────────────────────────
  protected readonly shopItems: ShopItem[] = [
    { id: 'whet', icon: '⚔️', name: 'Pierre d’affûtage', desc: 'Aiguise ta lame.', cost: 40, stat: 'atk', statLabel: 'ATK', amount: 5 },
    { id: 'plate', icon: '🛡️', name: 'Plastron renforcé', desc: 'Acier trempé.', cost: 40, stat: 'def', statLabel: 'DEF', amount: 5 },
    { id: 'boots', icon: '💨', name: 'Bottes ailées', desc: 'Plus léger que l’air.', cost: 35, stat: 'speed', statLabel: 'VIT', amount: 3 },
    { id: 'heart', icon: '❤️', name: 'Cœur de golem', desc: 'Vitalité de pierre.', cost: 60, stat: 'hp', statLabel: 'PV', amount: 25 },
    { id: 'crystal', icon: '💙', name: 'Cristal de mana', desc: 'Énergie arcanique pure.', cost: 50, stat: 'mana', statLabel: 'PM', amount: 20 },
  ];

  // ─── Auberge ──────────────────────────────────────────────────────────────
  /** A night's rest costs 10 % of the player's current gold. */
  protected readonly REST_GOLD_RATE = 0.1;
  /** Level required before the mage will offer New Game +. */
  protected readonly ASCENSION_MIN_LEVEL = 10;

  protected readonly toast = signal<Toast | null>(null);
  private toastTimer: ReturnType<typeof setTimeout> | undefined;

  protected get player(): IPlayer {
    return this.gameManagerService.currentPlayer;
  }

  protected get isFullHealth(): boolean {
    const p = this.player;
    return p.currentHp >= p.characteristics.hp && p.currentMp >= p.characteristics.mana;
  }

  protected canAfford(cost: number): boolean {
    return this.player.money >= cost;
  }

  protected buy(item: ShopItem): void {
    const p = this.player;
    if (!this.canAfford(item.cost)) return;
    p.money -= item.cost;
    p.characteristics[item.stat] += item.amount;
    if (item.stat === 'hp') p.currentHp += item.amount;
    if (item.stat === 'mana') p.currentMp += item.amount;
    this.flash(`${item.name} acquis · +${item.amount} ${item.statLabel}`, true);
  }

  /** Gold charged for a rest: 10 % of the player's current gold. */
  protected get restCost(): number {
    return Math.ceil(this.player.money * this.REST_GOLD_RATE);
  }

  protected rest(): void {
    const p = this.player;
    if (this.isFullHealth) {
      this.flash('Tu es déjà en pleine forme.', false);
      return;
    }
    p.money -= this.restCost;
    p.currentHp = p.characteristics.hp;
    p.currentMp = p.characteristics.mana;
    this.flash('Tu te réveilles ragaillardi — PV et PM restaurés.', true);
  }

  // ─── Mage mystérieux — New Game + ─────────────────────────────────────────
  private get baseClass(): ICharacter {
    return USER_CHOICES_CLASS.find((c) => c.type === this.player.type)!;
  }
  protected get ascension(): number {
    return this.player.ascension ?? 0;
  }
  /** Multiplier applied to the class base for the *current* run. */
  protected get currentMultiplier(): number {
    return Math.pow(2, this.ascension);
  }
  /** Multiplier after the next rebirth (double the base again). */
  protected get nextMultiplier(): number {
    return Math.pow(2, this.ascension + 1);
  }
  /** New Game + only unlocks once the hero reaches the required level. */
  protected get canAscend(): boolean {
    return this.player.lvl >= this.ASCENSION_MIN_LEVEL;
  }

  /** Stat preview rows: base value now → doubled after ascension. */
  protected get ascensionPreview(): { label: string; now: number; next: number }[] {
    const base = this.baseClass.characteristics;
    const cur = this.currentMultiplier;
    const nxt = this.nextMultiplier;
    return [
      { label: '⚔️ ATK', now: base.atk * cur, next: base.atk * nxt },
      { label: '🛡️ DEF', now: base.def * cur, next: base.def * nxt },
      { label: '💨 VIT', now: base.speed * cur, next: base.speed * nxt },
      { label: '❤️ PV', now: base.hp * cur, next: base.hp * nxt },
      { label: '💙 PM', now: base.mana * cur, next: base.mana * nxt },
    ];
  }

  protected newGamePlus(): void {
    if (!this.canAscend) return;
    const confirmed = confirm(
      'Renaissance (New Game +)\n\n' +
        'Toute ta progression (niveau, or, objets) sera réinitialisée, ' +
        'mais tes caractéristiques de base seront DOUBLÉES.\n\nConfirmer ?',
    );
    if (!confirmed) return;

    const base = this.baseClass.characteristics;
    const m = this.nextMultiplier;
    const characteristics: ICharacteristics = {
      atk: base.atk * m,
      def: base.def * m,
      speed: base.speed * m,
      hp: base.hp * m,
      mana: base.mana * m,
    };

    const reborn: IPlayer = {
      ...this.baseClass,
      characteristics,
      pseudo: this.player.pseudo,
      lvl: 1,
      currentXp: 0,
      currentHp: characteristics.hp,
      currentMp: characteristics.mana,
      money: 50,
      ascension: this.ascension + 1,
    };

    this.playerService.save(reborn);
    this.gameManagerService.initGame(reborn);
    this.router.navigateByUrl('/map');
  }

  private flash(msg: string, ok: boolean): void {
    this.toast.set({ msg, ok });
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toast.set(null), 2200);
  }
}
