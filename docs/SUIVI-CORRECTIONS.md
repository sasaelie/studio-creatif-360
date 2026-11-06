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
