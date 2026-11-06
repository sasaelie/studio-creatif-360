# Suivi des corrections visuelles et fonctionnelles

Base de la première revue : commit main b6765374e5025c3641cba12fdd14b973461c173a. La mise à jour éditoriale et la simplification de l’accueil partent du commit e256c99853dfdf56445a6a16a57340820b5adce4.

La table ci-dessous conserve les résultats de la première revue du 6 novembre 2026. Le nouveau contrôle figure après cet historique. Les tests sont reproductibles avec `npm run check` puis `npm run test:e2e`.

| Point | Objectif | État |
| --- | --- | --- |
| Encodage | Textes UTF-8 et accents lisibles | Validé : 61 fichiers et textes des dix pages |
| Accueil | Visuel entier, sans agrandissement destructeur | Validé visuellement, format horizontal conservé |
| Images | Affiches entières et accessibles en grand | Validé : chargement, object-fit contain et lien vers l’original |
| Identité | Nom du studio lisible dans l’en-tête | Validé sur captures de 320 à 1440 px |
| Verre dépoli | Transparence, flou et ombres partagés entre les panneaux | Validé : blanc à 32 %, flou de 22 px, ombres ; contrôle en défilant |
| Typographie | Police simple pour les petits titres et les textes | Validé : DM Sans ; flèche du visuel en SVG pour éviter un glyphe absent |
| Densité | Ateliers et pied de page plus compacts | Validé à 390 px : ateliers 983 px, pied de page 577 px |
| Tablette | Dernière carte centrée | Validé automatiquement à 768 px |
| Navigation | Ancres, clavier et menu en paysage | Validé : focus, Échap, retour au bouton, paysage 844 × 390 |
| Réservation | Demande par messagerie, sans fausse confirmation | Validé : atelier présélectionné, mailto encodé, validation, remise à zéro après modification |
| Cours | Présentations accessibles, sans faux accès payant | Validé : trois présentations et contact par e-mail |
| Blog | Articles réellement accessibles | Validé : liste et deux articles complets |
| Informations légales | Pages accessibles, coordonnées du code existant | Routes validées ; informations métier à confirmer par l’association |
| Régression | Routes, images et mobile testés automatiquement | Validé : 18 tests Playwright, compilation et types ; audit npm sans vulnérabilité |

## Périmètre et limites

- Aucun débordement horizontal aux largeurs 320, 390, 768, 1024 et 1440 px, ni en paysage 844 × 390. Le texte agrandi à 200 % est également testé à 320 px.
- Les dix pages connues répondent 200 ; les cours, articles et chemins inconnus répondent 404 sans erreur JavaScript non gérée.
- Les captures de page entière peuvent montrer un fond uni au-delà du premier écran : le décor est fixé à la fenêtre. Les captures prises après défilement servent au contrôle réel de la transparence.
- La demande prépare un e-mail sur l’appareil du visiteur. L’envoi exige une messagerie configurée ; une adresse directe est aussi affichée. Aucun service d’envoi, réservation confirmée ou paiement n’est simulé.
- Les cours sont des présentations. Aucun lecteur vidéo, espace membre ou accès payant n’est fourni.
- Les coordonnées et tarifs proviennent du code existant. Leur exactitude, les disponibilités et les règles de conservation des correspondances restent à confirmer par l’association avant exploitation.
- Les tests décrivent la version locale compilée ; le statut du déploiement et de la CI sont à consulter séparément dans Vercel et GitHub.

## Mise à jour : contenus confirmés et accueil simplifié

Informations fournies par l’association : adresse Rue Sous les Vignes 8, boîte 1, 4100 Seraing, Belgique ; quatre créneaux ; 20 € pour les enfants et 30 € pour les adultes ; capacité de cinq participants ; présentation d’Alyssia Wilkins et publication au Moniteur belge le 21 août 2026.

- Suppression du créneau du vendredi et des anciens compteurs de places restantes. Les liens vers un créneau supprimé reviennent au choix « Je souhaite être conseillé ».
- Fond ivoire et rose poudré ; vert réservé aux touches de l’interface.
- Un seul panneau pour la mission et la machine Jack. Le grand logo répété dans le corps de l’accueil est retiré ; l’identité reste dans l’en-tête et le pied de page.
- Un accès aux cours et un accès au blog sur l’accueil. Les listes sont sur leurs pages, sans panneau individuel par entrée.
- Nouvelles pages mission, localisation et catalogue des cours ; FAQ accessible avec des éléments HTML natifs.
- Coordonnées centralisées pour le pied de page, les pages légales, la confidentialité, l’itinéraire et les données structurées Organization.
- Titres et descriptions ciblés, URL canoniques des pages principales et sitemap complété. Les textes ne promettent aucun résultat de référencement.
- Cours en ligne : renseignements par e-mail, selon le choix confirmé par l’association. Aucun achat direct n’est annoncé.

Validation locale de cette mise à jour, le 6 novembre 2026 :

- `npm run check` réussi : 74 fichiers UTF-8 valides, compilation Next.js et vérification TypeScript.
- 24 tests Playwright réussis : mobile, tablette et ordinateur ; treize pages connues en HTTP 200 et chemins inconnus en 404.
- Adresse, quatre créneaux, tarifs enfants/adultes, FAQ, biographie, date de publication et repli d’un ancien lien du vendredi contrôlés automatiquement.
- Titres distincts, descriptions, adresses canoniques, sitemap, données structurées et destination de l’itinéraire contrôlés automatiquement. Le test normalise les URL pour accepter les deux écritures équivalentes de la racine, avec ou sans slash final.
- Captures examinées à 320, 390, 768, 1024 et 1440 px, ainsi qu’en paysage 844 × 390 ; pages mission, localisation et catalogue contrôlées sur mobile. Aucun débordement horizontal constaté.
- Fond de l’accueil : deux dégradés rose poudré sur ivoire, sans nappe verte. Contrôle des panneaux également après défilement.
- À 390 px : section des horaires mesurée à 893 px. Le texte agrandi à 200 % et le repli en cas d’image indisponible restent testés.
- `npm audit` : aucune vulnérabilité. `git diff --check` : aucune erreur d’espacement.

Ces contrôles concernent la compilation locale. La CI GitHub et l’aperçu Vercel doivent être vérifiés sur le commit publié ; la production ne doit pas être confondue avec cet aperçu.

## Ajustement ciblé des fiches conseils

Base : commit 6658b843d5ced43acab175b7c572eba11ea396b4. Le brief conserve la structure, les couleurs, les polices et les images sources. Le choix confirmé est de supprimer entièrement l’action d’agrandissement, y compris la loupe et le clic sur l’image.

- Les fiches utilisent leurs proportions natives, sans hauteur imposée ni recadrage. Imports statiques centralisés dans `data/illustrations.ts` pour réserver leur place avant chargement.
- Images non interactives ; suppression du bandeau, du lien vers le fichier et de l’icône.
- Arrondis de 16 px, bordure ivoire de 1 px et ombre chaude diffuse. Panneaux illustrés plus clairs, avec une marge intérieure de 16 px.
- Badge sauge sur les catégories du blog ; titres manuscrits sans soulignement permanent. Les liens ordinaires conservent leur repère visuel.
- Description du chouchou remplacée par le matériel et les gestes travaillés. Le second article propose des vérifications pratiques avant l’achat. Aucune durée inventée.
- Le menu peut se répartir sur plusieurs lignes en cas de texte agrandi. Sa hauteur réelle alimente la réserve supérieure des pages et des ancres.
- Le contrôle du texte à 200 % inclut désormais le masquage par le menu, au-delà de la seule absence de débordement horizontal.

Validation locale de cet ajustement :

- `npm run check` réussi : 76 fichiers UTF-8 valides, compilation et TypeScript.
- Suite de 30 tests Playwright réussie. Après le dernier ajustement du dialogue, les six contrôles concernés ont été relancés avec succès sur mobile, tablette et ordinateur. La CI relance la suite complète sur le commit publié.
- Les fiches ne sont plus dans un lien ou un bouton et aucun bandeau d’agrandissement n’est affiché. Leurs proportions naturelles et les liens vers les articles sont contrôlés automatiquement.
- À 390 px, la fiche du chouchou occupe les 324 px disponibles dans son entrée, contre environ 173 px lors de l’audit précédent. Son arrondi calculé est de 16 px.
- Captures examinées à 320, 390, 768, 1024 et 1440 px, ainsi que sur les pages cours, article et mission. Aucun débordement horizontal constaté.
- Texte à 200 % : en-tête d’environ 201 px à 320 px de largeur (contre 619 px lors de l’audit initial), et 141 px à 1024 px. Le lien retour reste sous le menu et visible dans la fenêtre.
- Le dialogue agrandi conserve son titre sur une ligne, propose une fermeture lisible et permet d’atteindre la réservation par défilement interne. Focus et touche Échap vérifiés.
- Audit npm sans vulnérabilité et `git diff --check` sans erreur. Les fichiers des images originales sont conservés.

Ces résultats concernent la compilation locale correspondante ; l’état de la CI et de l’aperçu Vercel est contrôlé séparément avant présentation.

## Dernier ajustement : mélange rose poudré–ivoire et ombres ivoire

Base : commit 0ee7d90b628c990c880d7146ee0e550eaf8db803.

- Dégradé diagonal continu avec rose poudré `#edc9d4` et ivoire `#fff8e7`, pour rendre les deux tons visibles dans la fenêtre.
- Ombres des panneaux, de l’en-tête après défilement et des fiches en ivoire. Suppression des anciennes composantes gris-vert et brunes de ces ombres.
- Voile du menu ouvert en ivoire, avec son flou conservé.
- Variables de palette et d’ombre centralisées dans `app/globals.css`. Structure, textes, images et interactions conservés.

Vérification locale : compilation, TypeScript et encodage des 76 fichiers réussis ; audit npm sans vulnérabilité ; `git diff --check` sans erreur.

Captures examinées à 390 et 1440 px sur l’accueil, les ateliers et le blog, avec défilement et ouverture du menu mobile. Les couleurs calculées des ombres des panneaux, du menu après défilement et des fiches sont toutes en RGB 255, 248, 231 (ivoire), avec des opacités adaptées. Le voile du dialogue utilise le même ivoire. Aucun débordement horizontal constaté. La suite existante de 30 tests est relancée par la CI GitHub sur le commit publié.
