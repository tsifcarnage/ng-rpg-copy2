# Design system — ng-rpg

Documentation de référence du système de design : **tokens** (variables CSS) et
**utilitaires SCSS** (mixins + classes globales), avec leur mode d'emploi.

## Architecture en deux couches

| Couche                                                                | Fichier                                       | Nature                        | Comment y accéder                                                                                                      |
| --------------------------------------------------------------------- | --------------------------------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| **Tokens** (couleurs, rayons, ombres, typo…)                          | [`src/styles.scss`](../styles.scss) → `:root` | Custom properties CSS (`--x`) | Globales : **aucun import**. Les variables traversent l'encapsulation Angular, donc visibles dans tous les composants. |
| **Mixins** (structures réutilisables)                                 | [`src/styles/_mixins.scss`](./_mixins.scss)   | Mixins SCSS (`@mixin`)        | Compilés : à **importer** dans chaque `.scss` qui les utilise.                                                         |
| **Classes globales** (`.title-contrast`, `.landing-button`, `.pill`…) | [`src/styles.scss`](../styles.scss)           | Sélecteurs globaux            | Disponibles dans n'importe quel template HTML.                                                                         |

### Importer les mixins dans un composant

```scss
// en tête de mon-composant.scss
@use '../../../styles/mixins' as *;

.ma-carte {
  @include surface(var(--radius-lg)); // mixin
  padding: 1.25rem;
  color: var(--text); // token : pas d'import nécessaire
}
```

> Les **tokens** s'utilisent partout via `var(--nom)`. Les **mixins** nécessitent
> la ligne `@use` (à adapter au nombre de `../` selon la profondeur du fichier).

---

## 1. Tokens — couleurs

### Triplets de canaux (`*-rgb`)

Permettent d'écrire une opacité arbitraire sans recopier la couleur :
`rgba(var(--success-rgb), 0.3)`.

| Token           | Valeur          |
| --------------- | --------------- |
| `--accent-rgb`  | `244, 175, 38`  |
| `--violet-rgb`  | `139, 124, 240` |
| `--gold-rgb`    | `250, 210, 66`  |
| `--success-rgb` | `21, 163, 8`    |
| `--danger-rgb`  | `236, 53, 53`   |
| `--info-rgb`    | `96, 165, 250`  |
| `--white-rgb`   | `255, 255, 255` |
| `--black-rgb`   | `0, 0, 0`       |

> **Règle :** pas de `rgba(21, 163, 8, …)` en dur dans un composant. Utiliser un
> token sémantique (`--success-soft`…) ou, si l'opacité voulue n'existe pas,
> `rgba(var(--success-rgb), α)`.

### Accents

| Token                                                 | Rôle                                           |
| ----------------------------------------------------- | ---------------------------------------------- |
| `--accent` `#f4af26`                                  | Ambre principal (titres, focus, surbrillances) |
| `--accent-soft`                                       | Fond translucide ambre (12 %)                  |
| `--accent-border`                                     | Bordure ambre (45 %)                           |
| `--accent-glow`                                       | Halo ambre (25 %)                              |
| `--violet` `#8b7cf0`                                  | Accent secondaire (arcane, navigation, zones)  |
| `--violet-soft` / `--violet-border` / `--violet-glow` | Fond / bordure / halo violet                   |
| `--gold` `#fad242`                                    | Or (monnaie, légendaire, dégradés gravés)      |
| `--gold-soft` / `--gold-border`                       | Fond / bordure or                              |

### Sémantiques (combat, logs, états)

Chaque couleur suit le même gabarit : `base`, `light`, `bright`, `soft` (fond),
`border`, `glow`, `text` (texte lisible sur fond sombre).

| Famille                | Base                  | Variantes                                                                                                                                     |
| ---------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Succès / joueur**    | `--success` `#15a308` | `--success-light` `#7cdc6e`, `--success-bright` `#2fbf3a`, `--success-soft`, `--success-border`, `--success-glow`, `--success-text` `#b8e8ad` |
| **Danger / ennemi**    | `--danger` `#ec3535`  | `--danger-light` `#ff6b6b`, `--danger-bright` `#c92a2a`, `--danger-soft`, `--danger-border`, `--danger-glow`, `--danger-text` `#f3b8b8`       |
| **Info / soin / mana** | `--info` `#60a5fa`    | `--info-deep` `#2563eb`, `--info-soft`, `--info-border`, `--info-text` `#b4d2fb`                                                              |

### Texte

| Token                    | Usage                                                     |
| ------------------------ | --------------------------------------------------------- |
| `--text` `#ffffff`       | Texte principal                                           |
| `--text-soft` `#cbd1da`  | Un cran sous le blanc (libellés de jauge, corps des logs) |
| `--text-muted` `#9aa1ab` | Texte secondaire, sous-titres                             |
| `--text-dim` `#6c6f7f`   | Texte très discret (timestamps, méta)                     |

### Surfaces & bordures

| Token                | Usage                                               |
| -------------------- | --------------------------------------------------- |
| `--surface`          | Fond de panneau givré (blanc 5 %)                   |
| `--surface-hover`    | Même fond au survol (blanc 10 %)                    |
| `--surface-sunken`   | Fond creusé (noir 40 %) — pistes de jauge           |
| `--scrim`            | Voile sombre (noir 35 %) — tuiles d'icône, overlays |
| `--scrim-strong`     | Voile fort (noir 60 %) — badges, lock               |
| `--border` `#6c6f7f` | Bordure standard                                    |
| `--border-soft`      | Bordure très discrète (blanc 8 %)                   |

### Palette de base (rarement directe)

`--charcoal-blue`, `--twilight-indigo`, `--charcoal-blue-2`, `--blue-slate`,
`--slate-grey` — teintes structurelles du fond. Préférer les tokens sémantiques
ci-dessus dans les composants.

---

## 2. Tokens — rayons, ombres, mouvement

| Token                  | Valeur                           | Usage                                   |
| ---------------------- | -------------------------------- | --------------------------------------- |
| `--radius-sm`          | `4px`                            | Petits éléments (inputs, lignes de log) |
| `--radius`             | `8px`                            | Boutons, cartes standard                |
| `--radius-lg`          | `12px`                           | Panneaux, grandes cartes                |
| `--radius-pill`        | `999px`                          | Pilules, jauges, badges                 |
| `--shadow-card`        | ombre douce                      | Élévation au repos                      |
| `--shadow-hover`       | ombre marquée                    | Élévation au survol                     |
| `--shadow-glow-accent` | anneau + halo ambre              | Carte sélectionnée                      |
| `--shadow-glow-violet` | anneau + halo violet             | Zone survolée                           |
| `--inset-top-light`    | reflet interne haut              | Profondeur des tuiles/cartes            |
| `--transition`         | `0.18s ease`                     | Durée standard des transitions          |
| `--ease-out`           | `cubic-bezier(0.22, 1, 0.36, 1)` | Courbe d'entrée/sortie « premium »      |

---

## 3. Tokens — typographie

| Token            | Valeur           | Police                              |
| ---------------- | ---------------- | ----------------------------------- |
| `--font-display` | Cinzel → serif   | Titres gravés (h1–h4)               |
| `--font-body`    | Spectral → serif | Corps de texte                      |
| `--font-mono`    | JetBrains Mono   | Journal de combat / valeurs système |

Échelle typographique (tierce majeure 1.25) :

| Token         | Valeur     |
| ------------- | ---------- |
| `--text-xs`   | `0.75rem`  |
| `--text-sm`   | `0.875rem` |
| `--text-base` | `1rem`     |
| `--text-lg`   | `1.25rem`  |
| `--text-xl`   | `1.6rem`   |
| `--text-2xl`  | `2rem`     |
| `--text-3xl`  | `2.6rem`   |

> Les polices sont chargées dans [`src/index.html`](../index.html) (Google Fonts).
> Toujours dimensionner via ces tokens plutôt que des `rem`/`px` arbitraires.

---

## 4. Mixins SCSS

Tous dans [`_mixins.scss`](./_mixins.scss). Rappel : `@use '…/mixins' as *;`.

### `surface($radius: var(--radius))`

Panneau givré de base (fond + bordure + rayon).

```scss
.carte {
  @include surface(var(--radius-lg));
}
```

### `surface-interactive($radius: var(--radius))`

`surface` + curseur, transitions et **survol** (lift + halo ambre). Pour les
cartes cliquables.

```scss
.zone {
  @include surface-interactive();
}
```

### `gold-frame($radius: var(--radius-lg), $fill: rgba(16,19,26,0.55))`

Cadre à **bordure dégradée** or → arcane (panneaux « héros »).

```scss
:host {
  @include gold-frame(var(--radius-lg));
}
.log {
  @include gold-frame(var(--radius-lg), rgba(var(--black-rgb), 0.55));
}
```

### `icon-badge($size: 64px, $radius: var(--radius-lg))`

Tuile carrée centrée (fond creusé + reflet) pour une icône/emoji.

```scss
.avatar {
  @include icon-badge(64px);
  font-size: 2.75rem;
}
```

### `ghost-button($radius: var(--radius))`

Bouton « fantôme » sur la surface : bordure neutre → survol ambre + lift,
gère `:active` et `:disabled`/`.disabled`. Surcharger pour les variantes
colorées (les `&.primary:hover` ont une spécificité supérieure et l'emportent).

```scss
.action-btn {
  @include ghost-button();
  padding: 0.7rem 0.9rem;

  &.primary:hover {
    background: rgba(var(--success-rgb), 0.35);
  }
}
```

### `pill($fg: var(--accent), $bg: var(--accent-soft), $border: rgba(var(--white-rgb), 0.08))`

Badge/chip arrondi (bordure fine + chiffres tabulaires).

```scss
.kind-tag {
  @include pill();
}
.cost {
  @include pill(var(--info), var(--info-soft), var(--info-border));
}
.money {
  @include pill(var(--gold), var(--gold-soft), var(--gold-border));
}
```

### `eyebrow`

Sur-titre de section : Cinzel, majuscules, interlettrage large, ambre.

```scss
.group-title {
  @include eyebrow;
}
```

### `display-title($size: var(--text-2xl))`

Grand titre gravé ambre avec halo. (Variante prête à l'emploi en classe :
`.title-contrast`, voir §5.)

```scss
.map-title {
  @include display-title(var(--text-2xl));
}
```

### `accent-rule`

Filet dégradé court placé **au-dessus** d'un élément (via `::before`).

```scss
.section {
  @include accent-rule;
}
```

### `gauge($height: 10px)`

Piste de barre de progression `<progress>` : creusée, arrondie, reflet interne.

```scss
progress {
  @include gauge(14px);
}
```

### `gauge-fill($a, $b, $moz: $b)`

Remplissage coloré d'une `<progress>` (dégradé `$a`→`$b` + brillance).
`$moz` = couleur Firefox (par défaut `$b`). **À appeler dans le sélecteur `progress`.**

```scss
.gauge-item.hp progress {
  @include gauge-fill(var(--success-bright), var(--success-light));
}
.gauge-item.mp progress {
  @include gauge-fill(var(--info-deep), var(--info));
}
```

### `gauge-labels`

Ligne libellé↔valeur au-dessus d'une jauge (flex, valeur en chiffres tabulaires).

```scss
.gauge-labels {
  @include gauge-labels;
}
```

### `page-shell($max: 1100px, $pad: 1.5rem)`

Colonne de page centrée et bornée en largeur.

```scss
.fight-container {
  @include page-shell(1200px, 1.5rem);
}
.history-wrapper {
  @include page-shell(960px, 0);
}
```

### `themed-scrollbar($color: var(--accent))`

Barre de défilement fine teintée.

```scss
.history-card {
  @include themed-scrollbar;
}
```

---

## 5. Classes & éléments globaux (HTML)

Définis dans [`src/styles.scss`](../styles.scss), utilisables directement dans les templates.

| Sélecteur                        | Effet                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------ |
| `h1.title-contrast`              | Titre or **animé** (dégradé gravé qui balaie) + halo                           |
| `h2.title-contrast`              | Titre ambre centré, plus petit                                                 |
| `h3.subtitle-contrast`           | Sous-titre ambre centré                                                        |
| `p.subtitle` / `p.subtitle-left` | Sous-titre italique discret (centré / à gauche)                                |
| `.landing-button`                | Gros CTA or avec balayage lumineux au survol ; `.disabled` pour l'état inactif |
| `div.pill-container > p.pill`    | Conteneur flex de pilules (utilise le mixin `pill`)                            |
| `input`                          | Champ stylé (fond surface, focus ambre) — automatique sur tout `<input>`       |
| `app-character-card`             | Carte de sélection de classe ; `.selected` pour l'état actif                   |

**Animations globales disponibles** (`animation: <nom> …`) :
`page-in`, `fade-up`, `pop-in`, `sheen`, `card-in-left`, `card-in-right`.
Le respect de `prefers-reduced-motion` est géré globalement.

```html
<h1 class="title-contrast">⚔️ Combat en cours</h1>
<p class="subtitle">Choisissez vos actions avec sagesse.</p>
<div class="landing-button" routerLink="/create-character">✨ Nouvelle partie</div>
```

---

## 6. Recettes courantes

**Une carte de panneau survolable**

```scss
@use '../../../styles/mixins' as *;
.carte {
  @include surface-interactive(var(--radius-lg));
  padding: 1.25rem;
}
```

**Un bouton d'action coloré (succès)**

```scss
.btn {
  @include ghost-button();
  &.primary {
    background: rgba(var(--success-rgb), 0.22);
    border-color: var(--success-border);
    &:hover {
      background: rgba(var(--success-rgb), 0.35);
      box-shadow: 0 0 16px var(--success-glow);
    }
  }
}
```

**Une jauge HP complète**

```html
<div class="gauge-item hp">
  <div class="gauge-labels">
    <p>❤️ PV</p>
    <p>120 / 120</p>
  </div>
  <progress [value]="hp" [max]="maxHp"></progress>
</div>
```

```scss
.gauge-item {
  .gauge-labels {
    @include gauge-labels;
  }
  progress {
    @include gauge(10px);
  }
  &.hp progress {
    @include gauge-fill(var(--success-bright), var(--success-light));
  }
}
```

---

## 7. Conventions

1. **Aucune couleur en dur** dans un composant → token sémantique, ou
   `rgba(var(--x-rgb), α)` si l'opacité manque.
2. **Aucune taille de police en dur** → échelle `--text-*`.
3. **Structure répétée 2× ou plus** → en faire un mixin dans `_mixins.scss`
   plutôt que copier-coller.
4. **Nouvelle couleur sémantique** → ajouter le triplet `--x-rgb` **et** les
   variantes `soft / border / glow / text` d'un coup, par cohérence.
5. Mouvements : utiliser `--transition` et `--ease-out` pour rester homogène.
