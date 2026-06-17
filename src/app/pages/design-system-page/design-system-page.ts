import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Swatch {
  /** CSS custom property name, e.g. `--accent`. */
  token: string;
  /** Human-readable value or role shown under the chip. */
  value: string;
  /** When true, the chip needs a light backdrop to be visible (translucent tokens). */
  onDark?: boolean;
}
interface SwatchGroup {
  num: string;
  title: string;
  hint: string;
  swatches: Swatch[];
}
interface TypeStep {
  token: string;
  rem: string;
}
interface MixinCard {
  id: string;
  name: string;
  signature: string;
  desc: string;
  code: string;
}
interface QuizQuestion {
  prompt: string;
  options: string[];
  correct: number;
  explain: string;
}
interface SmellLine {
  text: string;
  smell?: boolean;
}
interface SmellExercise {
  title: string;
  lines: SmellLine[];
  fix: string;
}
interface AccentChoice {
  id: string;
  label: string;
  token: string;
  soft: string;
  border: string;
}
interface WalkStep {
  tag: string;
  title: string;
  explain: string;
  code: string;
}
/** One source line of an annotated mixin; `note` makes it clickable. */
interface AnatomyLine {
  text: string;
  note?: string;
}

@Component({
  selector: 'app-design-system-page',
  imports: [RouterLink],
  templateUrl: './design-system-page.html',
  styleUrl: './design-system-page.scss',
})
export class DesignSystemPage {
  // ─── Hero transmutation (Avant ↔ Après) ──────────────────────────────────
  protected readonly showAfter = signal(true);

  protected readonly beforeCode = `/* fight-actions.scss — répété dans 5 fichiers */
.attack {
  background: rgba(21, 163, 8, 0.22);
  border: 1px solid rgba(21, 163, 8, 0.6);
  color: #ffffff;
}
.attack:hover {
  background: rgba(21, 163, 8, 0.35);
  box-shadow: 0 0 16px rgba(21, 163, 8, 0.25);
}`;

  protected readonly afterCode = `/* fight-actions.scss — une seule source de vérité */
.attack {
  @include ghost-button();
  background: rgba(var(--success-rgb), 0.22);
  border-color: var(--success-border);
}
.attack:hover {
  background: rgba(var(--success-rgb), 0.35);
  box-shadow: 0 0 16px var(--success-glow);
}`;

  // ─── Chapitre 02 — Les Runes (tokens) ─────────────────────────────────────
  protected readonly swatchGroups: SwatchGroup[] = [
    {
      num: '02·a',
      title: 'Accents',
      hint: 'Ambre principal, arcane secondaire, or.',
      swatches: [
        { token: '--accent', value: '#f4af26 · ambre' },
        { token: '--accent-soft', value: 'fond 12 %', onDark: true },
        { token: '--accent-border', value: 'bordure 45 %', onDark: true },
        { token: '--violet', value: '#8b7cf0 · arcane' },
        { token: '--violet-soft', value: 'fond 12 %', onDark: true },
        { token: '--gold', value: '#fad242 · or' },
      ],
    },
    {
      num: '02·b',
      title: 'Sémantiques',
      hint: 'Succès / danger / info — chacun décliné soft · border · glow · text.',
      swatches: [
        { token: '--success', value: '#15a308 · joueur' },
        { token: '--success-soft', value: 'fond', onDark: true },
        { token: '--success-text', value: 'texte lisible' },
        { token: '--danger', value: '#ec3535 · ennemi' },
        { token: '--danger-soft', value: 'fond', onDark: true },
        { token: '--danger-text', value: 'texte lisible' },
        { token: '--info', value: '#60a5fa · soin' },
        { token: '--info-soft', value: 'fond', onDark: true },
      ],
    },
    {
      num: '02·c',
      title: 'Texte & surfaces',
      hint: 'La hiérarchie de gris et les fonds givrés / creusés.',
      swatches: [
        { token: '--text', value: 'principal' },
        { token: '--text-soft', value: '#cbd1da' },
        { token: '--text-muted', value: 'secondaire' },
        { token: '--text-dim', value: 'discret' },
        { token: '--surface', value: 'panneau', onDark: true },
        { token: '--surface-sunken', value: 'creusé', onDark: true },
        { token: '--scrim', value: 'voile', onDark: true },
        { token: '--border', value: 'bordure' },
      ],
    },
  ];

  protected readonly typeScale: TypeStep[] = [
    { token: '--text-3xl', rem: '2.6rem' },
    { token: '--text-2xl', rem: '2rem' },
    { token: '--text-xl', rem: '1.6rem' },
    { token: '--text-lg', rem: '1.25rem' },
    { token: '--text-base', rem: '1rem' },
    { token: '--text-sm', rem: '0.875rem' },
    { token: '--text-xs', rem: '0.75rem' },
  ];

  protected readonly radii = ['--radius-sm', '--radius', '--radius-lg', '--radius-pill'];
  protected readonly shadows = ['--shadow-card', '--shadow-hover', '--shadow-glow-accent', '--shadow-glow-violet'];

  // ─── Chapitre 03 — Les Incantations (mixins) ──────────────────────────────
  protected readonly mixins: MixinCard[] = [
    {
      id: 'surface-interactive',
      name: 'surface-interactive($radius)',
      signature: '@include surface-interactive(var(--radius-lg));',
      desc: 'Panneau givré qui se soulève et s’auréole d’ambre au survol. Pour toute carte cliquable.',
      code: `.zone {\n  @include surface-interactive(var(--radius-lg));\n  padding: 1.25rem;\n}`,
    },
    {
      id: 'gold-frame',
      name: 'gold-frame($radius, $fill)',
      signature: '@include gold-frame(var(--radius-lg));',
      desc: 'Cadre à bordure dégradée or → arcane. Réservé aux panneaux « héros ».',
      code: `:host {\n  @include gold-frame(var(--radius-lg));\n  padding: 1.5rem;\n}`,
    },
    {
      id: 'icon-badge',
      name: 'icon-badge($size, $radius)',
      signature: '@include icon-badge(64px);',
      desc: 'Tuile carrée creusée et éclairée pour centrer une icône ou un emoji.',
      code: `.avatar {\n  @include icon-badge(64px);\n  font-size: 2.75rem;\n}`,
    },
    {
      id: 'pill',
      name: 'pill($fg, $bg, $border)',
      signature: '@include pill(var(--info), var(--info-soft), var(--info-border));',
      desc: 'Badge arrondi à bordure fine et chiffres tabulaires. Coûts, niveaux, étiquettes.',
      code: `.cost {\n  @include pill(var(--info), var(--info-soft), var(--info-border));\n}`,
    },
    {
      id: 'gauge',
      name: 'gauge($height) + gauge-fill($a, $b)',
      signature: '@include gauge(10px); @include gauge-fill(...);',
      desc: 'Piste de progression creusée + remplissage coloré brillant. PV, PM, XP.',
      code: `progress { @include gauge(10px); }\n.hp progress {\n  @include gauge-fill(\n    var(--success-bright), var(--success-light)\n  );\n}`,
    },
    {
      id: 'eyebrow',
      name: 'eyebrow',
      signature: '@include eyebrow;',
      desc: 'Sur-titre de section : Cinzel, majuscules, interlettrage large, ambre.',
      code: `.group-title { @include eyebrow; }`,
    },
  ];

  // ─── Chapitre 04 — Le Laboratoire (playground) ────────────────────────────
  protected readonly accentChoices: AccentChoice[] = [
    { id: 'accent', label: '🔥 Ambre', token: '--accent', soft: '--accent-soft', border: '--accent-border' },
    { id: 'violet', label: '🔮 Arcane', token: '--violet', soft: '--violet-soft', border: '--violet-border' },
    { id: 'success', label: '🌿 Succès', token: '--success', soft: '--success-soft', border: '--success-border' },
    { id: 'danger', label: '💥 Danger', token: '--danger', soft: '--danger-soft', border: '--danger-border' },
  ];
  protected readonly accent = signal<AccentChoice>(this.accentChoices[0]);

  protected pickAccent(choice: AccentChoice): void {
    this.accent.set(choice);
  }

  // ─── Chapitre 05 — Épreuves (quiz) ────────────────────────────────────────
  protected readonly quiz: QuizQuestion[] = [
    {
      prompt: 'Tu colores le fond d’un panneau givré survolable. Quel token ?',
      options: ['#2a2a2a', 'var(--surface)', 'rgba(255, 255, 255, 0.05)', 'var(--accent)'],
      correct: 1,
      explain: '--surface centralise ce fond. Le rgba en dur est exactement ce que le refactoring a supprimé.',
    },
    {
      prompt: 'Le vert succès vaut #15a308. Comment écrire un fond vert à 30 % ?',
      options: [
        'rgba(21, 163, 8, 0.3)',
        '#15a30850',
        'rgba(var(--success-rgb), 0.3)',
        'var(--success) avec opacity',
      ],
      correct: 2,
      explain: 'Le triplet --success-rgb laisse choisir l’opacité sans recopier la couleur.',
    },
    {
      prompt: 'Quel mixin pour une carte cliquable qui se soulève au survol ?',
      options: ['surface', 'gold-frame', 'surface-interactive', 'icon-badge'],
      correct: 2,
      explain: 'surface-interactive = surface + curseur + transitions + survol (lift et halo).',
    },
    {
      prompt: 'Quelle police pour le journal de combat ?',
      options: ['var(--font-display)', 'var(--font-mono)', 'var(--font-body)', 'monospace'],
      correct: 1,
      explain: '--font-mono (JetBrains Mono) aligne les colonnes du log. --font-display sert aux titres gravés.',
    },
  ];
  /** Selected option index per question, -1 if unanswered. */
  protected readonly answers = signal<number[]>(this.quiz.map(() => -1));

  protected answer(qIndex: number, oIndex: number): void {
    const next = [...this.answers()];
    if (next[qIndex] !== -1) return; // lock once answered
    next[qIndex] = oIndex;
    this.answers.set(next);
  }
  protected score(): number {
    return this.answers().reduce((acc, a, i) => acc + (a === this.quiz[i].correct ? 1 : 0), 0);
  }
  protected answered(): number {
    return this.answers().filter((a) => a !== -1).length;
  }
  protected resetQuiz(): void {
    this.answers.set(this.quiz.map(() => -1));
  }

  // ─── Épreuve « repère le code smell » ─────────────────────────────────────
  protected readonly smell: SmellExercise = {
    title: 'Repère la valeur en dur',
    lines: [
      { text: '.bouton-fuite {' },
      { text: '  background: rgba(236, 53, 53, 0.18);', smell: true },
      { text: '  border: 1px solid var(--danger-border);' },
      { text: '  border-radius: var(--radius);' },
      { text: '  color: var(--text);' },
      { text: '}' },
    ],
    fix: 'rgba(236, 53, 53, …) recopie le rouge danger. → rgba(var(--danger-rgb), 0.18) ou var(--danger-soft).',
  };
  protected readonly smellPick = signal<number | null>(null);

  protected pickSmell(index: number): void {
    if (this.smellPick() !== null) return;
    this.smellPick.set(index);
  }
  protected smellCorrect(): boolean {
    const pick = this.smellPick();
    return pick !== null && !!this.smell.lines[pick]?.smell;
  }

  // ─── L'Atelier — refactor guidé pas-à-pas (cas réel : icon-badge) ─────────
  protected readonly walk: WalkStep[] = [
    {
      tag: 'Étape 1 · le constat',
      title: 'Le même carré, recopié dans deux fichiers',
      explain:
        'Deux composants affichent une icône dans une tuile carrée. Chacun a sa propre copie des 8 mêmes lignes. Changer le style = le faire dans chaque fichier (ici 2, dans le vrai projet 3).',
      code: `/* fight-character-card.scss */
.identity .icon {
  width: 64px; height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.35);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-lg);
}

/* map-selector.scss — encore les mêmes lignes */
.zone-icon {
  width: 68px; height: 68px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid var(--border-soft);
  border-radius: var(--radius-lg);
}`,
    },
    {
      tag: 'Étape 2 · isoler le motif',
      title: 'Qu’est-ce qui change vraiment ?',
      explain:
        'La structure est identique. Seules la taille (64 / 68 px) et l’opacité du fond (0.35 / 0.3) diffèrent. → la taille devient un paramètre, le fond devient un token (--scrim). Tout le reste est constant.',
      code: `/* le motif commun, rendu abstrait */
width: $size;            /* ← paramètre */
height: $size;
display: flex;
align-items: center;
justify-content: center;
background: var(--scrim);          /* 0.35 ≈ 0.3 → un seul token */
border: 1px solid var(--border-soft);
border-radius: $radius;            /* ← paramètre */`,
    },
    {
      tag: 'Étape 3 · écrire le mixin',
      title: 'Nommer le motif, une fois pour toutes',
      explain:
        'On le déclare dans _mixins.scss avec des valeurs par défaut. Profitons-en pour ajouter un reflet (radial-gradient + inset) : comme tout passera par ici, l’amélioration bénéficiera à TOUS les usages d’un coup.',
      code: `/* src/styles/_mixins.scss */
@mixin icon-badge($size: 64px, $radius: var(--radius-lg)) {
  flex-shrink: 0;
  width: $size;
  height: $size;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: $radius;
  border: 1px solid var(--border-soft);
  background:
    radial-gradient(120% 120% at 50% 0%,
      rgba(var(--white-rgb), 0.07), transparent 60%),
    var(--scrim);
  box-shadow: var(--inset-top-light);
}`,
    },
    {
      tag: 'Étape 4 · remplacer les copies',
      title: 'Chaque composant n’appelle plus qu’une ligne',
      explain:
        'On importe les mixins en tête de fichier, puis on remplace les 8 lignes par un @include. Le rendu est identique — avec le reflet en bonus, gratuitement.',
      code: `@use '../../../styles/mixins' as *;

/* fight-character-card.scss */
.identity .icon { @include icon-badge(64px); font-size: 2.75rem; }

/* map-selector.scss */
.zone-icon { @include icon-badge(68px); font-size: 2.4rem; }`,
    },
    {
      tag: 'Étape 5 · le bénéfice composé',
      title: 'Une retouche → propagée partout',
      explain:
        'Le designer veut une ombre portée sous tous les badges ? Une ligne dans le mixin, et les usages suivent — sans rien chercher ni recopier. C’est ça, une source unique de vérité (le principe DRY).',
      code: `@mixin icon-badge($size: 64px, $radius: var(--radius-lg)) {
  /* …reste inchangé… */
  box-shadow:
    var(--inset-top-light),
    0 6px 16px rgba(var(--black-rgb), 0.4); /* ← ajouté ici, visible partout */
}`,
    },
  ];
  protected readonly step = signal(0);

  protected stepNext(): void {
    this.step.update((s) => Math.min(s + 1, this.walk.length - 1));
  }
  protected stepPrev(): void {
    this.step.update((s) => Math.max(s - 1, 0));
  }
  protected goStep(i: number): void {
    this.step.set(i);
  }

  // ─── Anatomie interactive du mixin `pill` ─────────────────────────────────
  protected readonly anatomy: AnatomyLine[] = [
    { text: '@mixin pill($fg, $bg, $border) {' },
    { text: '  display: inline-flex;', note: 'Aligne l’emoji et le texte sur une même ligne, centrés verticalement.' },
    { text: '  align-items: center;', note: 'Centre verticalement le contenu, quelle que soit sa hauteur.' },
    { text: '  gap: 0.35rem;', note: 'Espace constant entre l’icône et le texte — sans marge bricolée.' },
    { text: '  padding: 4px 10px;', note: 'Donne au chip sa compacité : serré en haut/bas, aéré sur les côtés.' },
    { text: '  border-radius: var(--radius-pill);', note: 'Token = 999px : des extrémités totalement arrondies (forme « pilule »).' },
    { text: '  border: 1px solid $border;', note: 'Liseré fin paramétrable — c’est lui qui garde le chip net sur un fond chargé.' },
    { text: '  color: $fg;', note: '1er paramètre : la couleur du texte. Passée par l’appelant.' },
    { text: '  background: $bg;', note: '2e paramètre : le fond translucide assorti (souvent un *-soft).' },
    { text: '  font-variant-numeric: tabular-nums;', note: 'Chiffres de largeur égale : les valeurs (PM, coûts, niveaux) ne « sautent » pas.' },
    { text: '}' },
  ];
  protected readonly anatomyActive = signal<number | null>(null);

  protected toggleAnatomy(i: number): void {
    this.anatomyActive.set(this.anatomyActive() === i ? null : i);
  }

  // ─── Copie presse-papiers ─────────────────────────────────────────────────
  protected readonly copied = signal<string | null>(null);

  protected copy(text: string): void {
    navigator.clipboard?.writeText(text).then(() => {
      this.copied.set(text);
      setTimeout(() => {
        if (this.copied() === text) this.copied.set(null);
      }, 1400);
    });
  }
}
