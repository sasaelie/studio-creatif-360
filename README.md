# Studio Créatif 360

Site Next.js (App Router), React, TypeScript et Tailwind CSS.

## Installation sur PC

Utiliser Node.js 24 (version testée dans `.nvmrc`) et npm 11.
Avec nvm : `nvm install` puis `nvm use`. Sur Windows, avec nvm-windows,
utiliser `nvm install 24.22.1` puis `nvm use 24.22.1`.

Depuis la racine du projet :

```sh
npm ci
npm run dev
```

Ouvrir http://localhost:3000. Aucun fichier `.env` n'est nécessaire actuellement.

## Vérifications avant publication

```sh
npm run check
npm audit
npx playwright install chromium
npm run test:e2e
npm run start
```

`check` contrôle l'encodage des sources, compile le site puis vérifie les types.
`npm run check:encoding` contrôle séparément les fichiers UTF-8 et recherche les
séquences caractéristiques d'une conversion de caractères erronée. Le diagnostic
indique le fichier, la ligne et le texte concerné ; il bloque la vérification si
une anomalie est détectée. Cette recherche ciblée ne garantit pas de reconnaître
toutes les formes possibles de texte corrompu.

Ce contrôle ne remplace pas les tests
dans un navigateur. Vérifier les largeurs 320, 390, 768, 1024 et 1440 px,
le clavier, le zoom et les liens. Le téléchargement des polices Google nécessite
un accès réseau lors de la compilation.

## Chemins et publication

Les imports `@/` sont résolus depuis la racine par `tsconfig.json`.
Les images de `public/` sont référencées par `/nom-du-fichier.jpg`.
Respecter la casse des noms, notamment sur les hébergements Linux.

Publier sur un hébergement compatible Next.js avec Node 24, en utilisant
`npm ci`, `npm run build` et `npm run start` (ou l'intégration Next de l'hébergeur).
GitHub stocke le code ; GitHub Pages ne lance pas un serveur Next.js.
Le site suppose un déploiement à la racine du domaine. Un sous-répertoire
nécessite une configuration et une validation spécifiques des liens et images.

Les pages réservation, cours, blog et informations légales sont implémentées.
La demande d’atelier prépare un e-mail que le visiteur relit et envoie depuis sa
messagerie ; aucune place n’est bloquée ni confirmée automatiquement. Les cours
présentent les thèmes et les tarifs existants, puis proposent de contacter l’ASBL.
Aucune vidéo payante, aucun compte et aucun paiement ne sont simulés.
Les disponibilités affichées sont des données statiques et indicatives.

## Organisation

- `app/` : routes, layout et styles globaux.
- `components/` : sections, avec leurs styles dans des CSS Modules.
- `components/ui/` : conteneur et titre de section partagés.
- `components/cards/` : cartes de cours et d'articles.
- `components/navigation/` : menu mobile avec dialogue natif accessible.
- `data/` : contenu typé et navigation commune.
- `hooks/` : logique React de suivi du défilement.
- `tests/` : tests Playwright des routes, du responsive, du menu et de la demande.
- `docs/SUIVI-CORRECTIONS.md` : état de chaque point de la revue.

Les composants gardent le JSX, les fichiers `.module.css` portent leurs styles,
et les données sont séparées. Les imports CSS sont locaux aux composants.
La couleur sauge foncé assure la lisibilité des boutons ; le sauge clair reste décoratif.

`GlassSurface.module.css` centralise la transparence (32 % de blanc), le flou,
les bordures et les ombres des panneaux. Un fond opaque est conservé pour les
navigateurs qui ne prennent pas en charge le flou. Les images originales sont
affichées entières avec `object-fit: contain` et s’ouvrent en grand ; leur contenu
n’a pas été retouché. La typographie manuscrite est réservée aux grands titres.

Les informations légales reprennent les coordonnées présentes dans le code
initial. L’association doit maintenir ces renseignements à jour et préciser ses
modalités de conservation des correspondances. Le code n’ajoute pas de traceur
publicitaire, de stockage des champs ni d’envoi de formulaire côté serveur.

Les tests nécessitent un build (`npm run check`). En CI, Chromium est installé
automatiquement. Pour utiliser un navigateur déjà installé, renseigner la variable
`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` avec le chemin de son exécutable.

La règle `overrides` de `package.json` impose à Next le PostCSS corrigé déjà
utilisé par le projet. La compilation et l'audit doivent être relancés après
toute mise à jour de Next ou de PostCSS pour vérifier cette compatibilité.
