# high-rank.io v2 — Refonte ton + i18n FR/EN

**Date:** 2026-05-25
**Auteur:** Tristan + Claude
**Statut:** Brainstormed, en attente de review

## 1. Objectif

Refondre `index.html` du site **high-rank.io** pour :

1. **Rendre le site accessible à n'importe qui** — un boulanger, un coach, un artisan, un dirigeant non-tech doit comprendre l'offre et se sentir à l'aise en 10 secondes. Suppression de tout le jargon SEO/dev.
2. **Traduire en français** avec sélecteur de langue FR/EN et détection automatique du navigateur.
3. **Conserver intégralement la charte visuelle Signal** (dark `#0E0E10` + jaune électrique `#E5FF00`, Space Grotesk / Inter / JetBrains Mono).
4. **Conserver les 11 sections existantes** mais toutes reformulées en français chaleureux et collaboratif.

## 2. Décisions de positionnement (validées)

| Décision | Choix retenu |
|---|---|
| Audience cible | **N'importe qui** — zéro pré-requis SEO. Du boulanger au dirigeant PME. |
| Promesse cœur | **Plus de leads. Agenda rempli. Plus de chiffre d'affaires.** |
| CTA unique | **Recevoir mon diagnostic gratuit** → formulaire brief existant |
| Ton | Vouvoiement chaleureux + langage collaboratif ("on regarde ensemble", "on identifie") |
| Langue par défaut | Détection auto via `navigator.language` + switcher visible pour override |
| Structure | 11 sections conservées, toutes reformulées (pas de suppression) |
| Brand | **HIGH RANK** conservé tel quel (mark anglais) |
| Preuves sociales | Tristan fournira 2-3 cas clients chiffrés + 1-2 témoignages réels |

## 3. Architecture technique

### 3.1 Pile technique
- HTML statique pur — cohérent avec le déploiement Hostinger actuel.
- Aucun framework, aucun build step.
- CSS et JS inline dans `index.html` (comme aujourd'hui).
- Déploiement : zip → `mcp__hostinger__hosting_deployStaticWebsite` sur le domaine `high-rank.io`.

### 3.2 i18n côté client

**Dictionnaire :**
```js
const i18n = {
  fr: { 'hero.h1': 'Plus de clients. Agenda rempli. Plus de chiffre d\'affaires.', ... },
  en: { 'hero.h1': 'More leads. Booked calendar. More revenue.', ... }
};
```

**Marquage des textes :**
- Chaque élément traduisible porte `data-i18n="<clé>"`.
- Les attributs traduisibles (placeholders, aria-label, alt) portent `data-i18n-attr="placeholder:<clé>;aria-label:<clé>"`.
- La meta description et le `<title>` sont aussi swappés.

**Fonction `applyLang(lang)` :**
1. Met à jour `<html lang="fr|en">`.
2. Parcourt tous les `[data-i18n]` et remplace `textContent`.
3. Parcourt tous les `[data-i18n-attr]` et remplace les attributs spécifiés.
4. Met à jour `<title>` et `<meta name="description">`.
5. Met à jour l'état visuel du switcher (pill active en jaune).
6. Stocke le choix dans `localStorage.setItem('hr-lang', lang)`.

**Au chargement (`DOMContentLoaded`) :**
```js
const stored = localStorage.getItem('hr-lang');
const browser = navigator.language?.startsWith('fr') ? 'fr' : 'en';
applyLang(stored || browser);
```

**Pas de routing `/fr/` `/en/`** — overkill pour un site statique mono-page. Le choix est uniquement côté client via `localStorage`.

### 3.3 Sélecteur de langue (composant)

- **Position :** dans la nav header, à droite, juste avant le CTA "Recevoir mon diagnostic gratuit".
- **Markup :**
  ```html
  <div class="lang-switcher" role="group" aria-label="Langue">
    <button data-lang="fr" class="lang-pill active">FR</button>
    <span class="lang-sep">·</span>
    <button data-lang="en" class="lang-pill">EN</button>
  </div>
  ```
- **Style :** mono font (JetBrains Mono), 12px, la pill active porte la couleur `#E5FF00`, l'autre `rgba(255,255,255,.4)`.
- **Comportement :** au clic, `applyLang(button.dataset.lang)`.

## 4. Plan section par section

Pour chaque section : ce qu'on garde, ce qu'on enlève (jargon), et la trame du nouveau copy FR.

### Section 1 — Hero

**Garde :** layout actuel (gauche : copy, droite : preview), pill "Available" → reformulée, metas chiffrées, 2 CTAs.

**Copy FR final :**
- Pill : `● Diagnostic gratuit ouvert`
- H1 : **Plus de clients. Agenda rempli. Plus de chiffre d'affaires.**
  - Mots highlightés en jaune via `<em>` : "clients", "Agenda rempli", "chiffre d'affaires"
- Sous : *"Votre site existe, mais peu de gens le trouvent sur Google ? On analyse ce qui bloque, on vous remet un plan d'action clair. Sans jargon technique."*
- CTA primaire : `Recevoir mon diagnostic gratuit` (ancre `#brief`)
- CTA secondaire : `Voir comment ça marche` (ancre `#method`)
- Metas : `10+ ans d'expérience` · `30+ secteurs accompagnés` · `50+ sites construits`
  - (chiffres exacts à confirmer par Tristan pendant l'implémentation)

**Copy EN final** : équivalent direct (cf. dictionnaire i18n complet en implémentation).

### Section 2 — Problème

**Garde :** layout sticky avec 3 cards à droite et titre/compteur à gauche.

**Vire :** "10,000 lines of Excel", "200 micro-decisions", "You read 20 SEO checklists", "You asked your dev to fix it".

**Copy FR :**
- Eyebrow : `Le problème`
- H2 : **Pourquoi votre site ne vous ramène pas de clients ?**
- Card 01 : *"Vous êtes sur Google… mais en page 3."* — Personne ne va en page 3. Si vous n'êtes pas dans le top 5, vos clients vont chez vos concurrents.
- Card 02 : *"Vous payez de la pub pour rien."* — Google Ads, Meta Ads… ça coûte cher et ça s'arrête dès que vous coupez le robinet. Le référencement naturel travaille pour vous 24/7.
- Card 03 : *"Vos concurrents apparaissent à votre place."* — Ils sont en haut, vous en bas. Souvent ce n'est pas qu'ils sont meilleurs — c'est qu'ils ont une méthode.
- Conclusion : **Ce n'est pas une question de chance. C'est une question de méthode.**

### Section 3 — Méthode (ex-"AI handles the volume / I handle the call")

**Garde :** structure compare table (gauche : "Les autres" / droite : "HIGH RANK").

**Vire :** "AI handles volume", "AI detects, my expertise decides", tout le vocabulaire "AI/expert".

**Copy FR :**
- Eyebrow : `La méthode`
- H2 : **On combine puissance d'analyse et bon sens humain.**
- Compare (les autres vs nous) :
  - Eux : *"Un outil automatique vous envoie un PDF de 200 pages. À vous de comprendre."*
  - Nous : *"On vous remet un plan d'action priorisé en 3 pages : quoi faire en premier, en deuxième, en troisième."*
- Tagline : *"On analyse en profondeur. **On décide ce qui compte vraiment** pour vous."*

### Section 4 — Process

**Garde :** 5 étapes timeline.

**Reformule :**
1. *"Vous remplissez le mini-brief (3 minutes)"* — quelques questions simples sur votre activité et vos objectifs.
2. *"On analyse votre site"* — sous 48h, on regarde ce qui bloque votre visibilité.
3. *"On vous envoie le diagnostic"* — un document clair, sans jargon, avec les priorités.
4. *"Call de restitution (offert)"* — on vous explique tout en visio, vous posez vos questions.
5. *"Vous décidez de la suite"* — on peut s'arrêter là, ou continuer ensemble.

### Section 5 — What I Find (Ce qu'on découvre)

**Garde :** layout 2×2 diff grid avec arrows.

**Vire :** "Zombie pages cannibalizing your own content", "Keywords ranking #11–20", "Internal linking diluting your authority".

**Copy FR :**
- Eyebrow : `Ce qu'on découvre`
- H2 : **Ce que nos analyses révèlent (et que les outils gratuits manquent).**
- Cell 1 : *"Des pages de votre site qui se concurrencent entre elles."* — Vous avez plusieurs pages qui parlent du même sujet ? Elles s'annulent mutuellement sur Google. On vous dit lesquelles fusionner.
- Cell 2 : *"Des mots-clés à un cheveu du top 5."* — Vous êtes en position 8-12 sur des recherches qui paient. Souvent un effort ciblé suffit pour passer dans le top 5.
- Cell 3 : *"Des liens internes mal placés."* — Sur votre site, certaines pages reçoivent toute la "force" et d'autres rien. On rééquilibre pour que ça profite aux bonnes pages.
- Cell 4 : *"Ce que vos concurrents font, et pas vous."* — Les recherches sur lesquelles ils captent du trafic, et que vous pourriez prendre.
- Conclusion : *"L'analyse profonde, on l'a. **La traduction en actions claires, c'est notre métier.**"*

### Section 6 — Services

**Garde :** 3 cards services + prix transparents.

**Reformule les titres :**
1. *"Diagnostic complet"* (ex "Complete SEO Audit") — Un état des lieux complet de votre site + plan d'action. Idéal pour démarrer. **Prix : à confirmer par Tristan.**
2. *"Diagnostic + accompagnement 3 mois"* (ex "Audit + 3-Month Build") — Le diagnostic + on bosse avec vous pendant 3 mois pour mettre en place les actions prioritaires.
3. *"Suivi continu"* (ex "Continuous Retainer") — Pour les entreprises qui veulent une équipe SEO en interne sans recruter.

**Note importante :** le CTA principal du site reste **"Recevoir mon diagnostic gratuit"**. Les 3 offres sont là à titre informatif pour ceux qui veulent voir la suite logique. Sur chaque card, le CTA secondaire est *"En discuter"* (ancre `#brief`).

### Section 7 — Brief (formulaire)

**Garde :** structure du formulaire (URL + nom/email + objectif + contexte + consent).

**Reformule :**
- Eyebrow : `Diagnostic gratuit`
- H2 : **Parlez-nous de votre projet.**
- Intro : *"3 minutes. Vous nous donnez le contexte, on vous renvoie une première analyse sous 48h."*
- Labels champs : `Votre site web (URL)` / `Votre prénom` / `Votre email` / `Votre objectif principal` / `Quelques mots sur votre activité`
- Bouton submit : `Envoyer mon brief`
- État succès : *"Merci ! On regarde ça et on vous revient sous 48h."*

### Section 8 — Pourquoi nous (Why HIGH RANK)

**Garde :** 3 reasons grid.

**Reformule (raisons centrées client, pas process) :**
1. *"Pas de jargon. Que des actions concrètes."* — On vous parle comme à un partenaire, pas comme à un dev. Vous comprenez chaque décision.
2. *"On bosse uniquement avec des gens qu'on peut vraiment aider."* — Si on pense qu'on ne peut rien faire pour vous, on vous le dit. Pas de contrat alibi.
3. *"Vous payez le résultat, pas le rapport."* — Le diagnostic est gratuit. Vous décidez ensuite si vous voulez continuer.

### Section 9 — About (Tristan)

**Garde :** photo + bio.

**Reformule :**
- Eyebrow : `Qui est derrière HIGH RANK`
- H2 : **Tristan — fondateur**
- Bio courte (3-4 phrases en mode humain) :
  - *"Je fais du SEO depuis 10 ans. J'ai monté mes propres sites (artisans locaux, e-commerce, blogs spécialisés) avant d'aider les autres."*
  - *"Ce que j'ai appris en gérant mes propres business : la théorie SEO ne sert à rien sans exécution simple. C'est ça que j'apporte à mes clients."*
  - *"Aujourd'hui, j'accompagne des indépendants et des PME qui veulent que leur site devienne une vraie machine à clients — pas un placard."*

### Section 10 — Manifesto

**Garde :** la section inversée (fond clair, texte sombre) avec le ton "vision/parti pris".

**Reformule en mode humain (vire le ton manifesto pompeux si présent) :**
- H2 : **Notre conviction.**
- Body : *"Le SEO n'est pas un secret réservé aux experts. C'est une méthode rigoureuse, applicable, mesurable. Notre job : la rendre claire pour vous, et exécuter ce qui compte. Pas de buzzwords, pas de promesses magiques. Du travail, et des résultats."*

### Section 11 — FAQ

**Garde :** accordion avec +/× toggle.

**6 questions reformulées pour un visiteur non-tech :**
1. *"C'est vraiment gratuit, le diagnostic ?"* — Oui, totalement. Aucune carte bancaire, aucun engagement. Vous remplissez le brief, on vous envoie l'analyse, point.
2. *"Combien de temps avant de voir des résultats ?"* — Honnêtement : entre 2 et 6 mois pour des résultats visibles, selon votre point de départ et votre secteur. On vous dit ce qui est réaliste pour vous.
3. *"Et si je n'y connais rien en SEO ?"* — Parfait. Notre travail est justement de traduire le SEO en décisions business. Vous n'avez pas besoin de comprendre la mécanique, juste les bonnes actions.
4. *"Vous travaillez avec quels types d'entreprises ?"* — Indépendants, artisans, PME, e-commerce. On a accompagné +30 secteurs. Si on ne peut pas vous aider, on vous le dira après le diagnostic.
5. *"C'est quoi exactement, le SEO ?"* — Faire en sorte que votre site apparaisse en haut de Google sans payer de pub. Long terme, mais durable.
6. *"Combien ça coûte ensuite ?"* — Les offres payantes vont de quelques centaines à quelques milliers d'euros selon votre besoin. On en parle après le diagnostic, seulement si vous voulez.

## 5. Considérations techniques détaillées

### 5.1 SEO de la page
- `<title>` swappé selon langue : `HIGH RANK — Plus de clients via Google` / `HIGH RANK — More leads from Google`.
- `<meta name="description">` swappée.
- `<html lang>` mis à jour dynamiquement.
- Pas de balise `<link rel="alternate" hreflang>` car même URL pour les deux langues (l'i18n est côté client uniquement). Si Tristan veut référencer les deux langues séparément plus tard, on basculera sur `/fr/` `/en/` avec hreflang propre.

### 5.2 Accessibilité
- Switcher langue : `aria-pressed` sur la pill active.
- Le formulaire conserve les labels associés à chaque champ.
- Les highlights `<em>` n'ont aucun impact sur le DOM order ni sur les lecteurs d'écran.

### 5.3 Performance
- Page reste mono-fichier statique → temps de chargement inchangé.
- L'i18n côté client ajoute < 10 KB de JS (dictionnaire FR+EN + fonction `applyLang`).
- Pas de flash de contenu : la version FR est dans le HTML par défaut (vue par les bots/SEO), et le JS swap vers EN seulement si nécessaire au `DOMContentLoaded`.

### 5.4 Fallback no-JS
- HTML est rendu en français par défaut (langue principale du marché).
- Si JS désactivé, le site fonctionne en français uniquement, le switcher est inactif.

## 6. Périmètre — ce qui est in / out

**IN :**
- Refonte complète du copy de `index.html` (FR + EN).
- Ajout du sélecteur de langue + dictionnaire i18n + fonction `applyLang`.
- Mise à jour de `<title>`, `<meta>`, `<html lang>`.
- Conservation intégrale de la charte visuelle (couleurs, fonts, layout, animations).
- Déploiement final sur Hostinger via MCP.

**OUT (pas dans ce chantier) :**
- Pages `mentions-legales.html` / `privacy.html` — restent telles quelles pour l'instant (à traduire dans un chantier séparé si besoin).
- Création de pages secondaires (`/services`, `/about`, `/blog`).
- Refonte du design visuel (couleurs, fonts, layout).
- Connexion d'un backend pour le formulaire (le formulaire conserve son action actuelle, à vérifier).
- Routing serveur `/fr/` `/en/` avec hreflang propre.
- Optimisations SEO on-page avancées (schema.org, sitemap.xml, etc.) — à voir après.

## 7. Données à fournir par Tristan pendant l'implémentation

1. **Cas clients (section Résultats)** : 2-3 cas chiffrés (ex : "Site e-commerce mode, +280% trafic en 90 jours") + 1-2 témoignages avec nom/photo si possible.
2. **Prix exacts** des 3 offres (Diagnostic complet / +3 mois / Suivi continu).
3. **Metas hero** : confirmer "10+ ans / 30+ secteurs / 50+ sites" ou ajuster.
4. **Endpoint du formulaire** : confirmer où va le POST du brief (email perso, service tiers type Formspree, etc.).

Ces données sont matérialisées comme placeholders visibles `[À CONFIRMER]` dans le code lors de l'implémentation.

## 8. Critères de succès

- ✅ Un visiteur qui ne sait pas ce qu'est le SEO comprend l'offre en lisant le hero.
- ✅ Zéro jargon technique sur la home (pas de "zombie pages", "link equity", "SERP", etc.).
- ✅ Le ton est cohérent (vous + on/nous) sur les 11 sections.
- ✅ Le switcher FR/EN fonctionne, persiste, et la détection auto marche.
- ✅ La charte visuelle (couleurs, fonts, layout, animations) est identique au site actuel.
- ✅ Le site reste mono-fichier statique, déployable sur Hostinger sans build.
