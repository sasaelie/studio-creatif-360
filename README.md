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

Les pages mission (`/notre-mission`), localisation (`/localisation`), catalogue
(`/cours`), réservation, blog et informations légales sont implémentées.
La demande d’atelier prépare un e-mail que le visiteur relit et envoie depuis sa
messagerie ; aucune place n’est bloquée ni confirmée automatiquement. Les cours
présentent les thèmes et les tarifs existants, puis proposent de contacter l’ASBL.
Aucune vidéo payante, aucun compte et aucun paiement ne sont simulés.
Les quatre créneaux et tarifs d’atelier proviennent des renseignements fournis
par l’association : 20 € pour les enfants, 30 € pour les adultes. Le site indique
une capacité de cinq participants, sans inventer de compteur de places restantes.
La date et la disponibilité doivent être confirmées par l’association.

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
Le fond mélange le rose poudré `#edc9d4` et le blanc neutre `#f7f7f7` dans un dégradé
diagonal continu. Les couleurs et les ombres sont centralisées dans les variables
`--studio-*` de `app/globals.css`. Panneaux, en-tête et fiches utilisent des ombres
gris doux à faible opacité ; le voile du menu ouvert utilise le même blanc neutre grâce à une
variable distincte. Le vert foncé sert aux boutons et à certains
titres, sans nappe verte dans le décor. La mission et son illustration partagent
un panneau. L’accueil n’affiche pas le catalogue ou les articles : un accès unique
conduit à chaque page dédiée, où les entrées sont séparées par de simples lignes.

`GlassSurface.module.css` centralise la transparence (24 % de blanc), le flou,
les bordures et les ombres des panneaux. Un fond opaque est conservé pour les
navigateurs qui ne prennent pas en charge le flou. Les images originales sont
affichées entières et ne déclenchent aucune ouverture au clic. Leurs dimensions
proviennent des imports statiques de `data/illustrations.ts` ; un nouveau visuel
doit y être enregistré. Les coins des fiches sont arrondis, avec une fine bordure
blanc neutre et une ombre gris doux légère. Leur contenu n’a pas été retouché.
La typographie manuscrite est réservée aux grands titres. Les pages illustrées
utilisent un fond blanc neutre à 48 % et une marge intérieure unique de 16 px.
Seule la transparence de ce fond est ajustée : textes et images restent opaques.
Les variables `--studio-off-white` et `--studio-off-white-rgb` centralisent cette
teinte sans dominante jaune. L’ancien nom de couleur Tailwind `ivoire` reste
disponible pour les classes existantes, avec la valeur neutre `#F7F7F7`.

`useHeaderHeight` réserve la hauteur réelle de l’en-tête après redimensionnement,
chargement des polices et changement de taille du texte. Une marge de confort
sépare le menu du lien retour. Le nom du studio reste lisible sur petit écran ;
le menu peut passer sur une deuxième ligne lorsque le texte est agrandi.

`data/site.ts` centralise l’adresse confirmée par l’association : Rue Sous les
Vignes 8, boîte 1, 4100 Seraing, Belgique. `data/about.ts` contient la mission et
la présentation d’Alyssia Wilkins ; `data/faq.ts` reprend les réponses fréquentes.
Les métadonnées, les URL canoniques, le sitemap et les données structurées de
l’association relient ces pages. Aucun classement dans Google n’est garanti.

Les treize pages connues ont un titre, une description propre et une adresse
canonique, vérifiés dans les tests de rendu. Les descriptions SEO des cours sont
distinctes de leurs courtes présentations affichées. Le site utilise un H1 par
page, des liens internes, des textes alternatifs pour les illustrations et des
contenus locaux liés à Seraing. `robots.txt` référence le sitemap.

Ces éléments préparent le référencement ; ils ne confirment pas l’indexation.
Un aperçu Vercel protégé n’est pas une version publique à référencer. Après
fusion et mise en production, il reste à contrôler l’accès public, les URL du
sitemap sur le domaine retenu, l’indexation dans Google Search Console et les
performances réelles (Core Web Vitals). Ces contrôles externes ne sont pas
remplacés par les tests du code.

Les mentions légales indiquent la publication aux Annexes du Moniteur belge du
21 août 2026, d’après les renseignements fournis. L’association doit maintenir
ces renseignements à jour et préciser ses
modalités de conservation des correspondances. Le code n’ajoute pas de traceur
publicitaire, de stockage des champs ni d’envoi de formulaire côté serveur.

Les tests nécessitent un build (`npm run check`). En CI, Chromium est installé
automatiquement. Pour utiliser un navigateur déjà installé, renseigner la variable
`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` avec le chemin de son exécutable.

La règle `overrides` de `package.json` impose à Next le PostCSS corrigé déjà
utilisé par le projet. La compilation et l'audit doivent être relancés après
toute mise à jour de Next ou de PostCSS pour vérifier cette compatibilité.
