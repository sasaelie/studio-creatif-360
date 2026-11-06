# Suivi des corrections visuelles et fonctionnelles

Base : commit main b6765374e5025c3641cba12fdd14b973461c173a.

Contrôles effectués le 6 novembre 2026 sur une compilation de production locale. Les tests sont reproductibles avec `npm run check` puis `npm run test:e2e`.

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
