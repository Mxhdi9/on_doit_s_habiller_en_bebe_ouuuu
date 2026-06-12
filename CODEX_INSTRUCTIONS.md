# Instructions pour Codex — Projet ASCALON / Jeu Nadir

Ce projet est un site / jeu narratif RP autour de Nadir et du programme ASCALON.

## Objectif

Créer un site immersif, sombre, cinématographique, avec une navigation claire, des pages propres et une ambiance thriller / dossier confidentiel.

## Style visuel

- Fond sombre.
- Couleurs principales : noir, rouge sombre, blanc cassé, or sale, cyan très discret si nécessaire.
- Effets : glitch léger, scanlines, interface confidentielle.
- Ne pas surcharger les animations.
- Texte lisible avant tout.

## Structure

- `index.html` : point d’entrée principal.
- `pages/` : futures pages autonomes du jeu ou du lore.
- `assets/images/` : images et visuels.
- `assets/videos/` : vidéos publiables.
- `assets/audio/` : musiques et sons.
- `assets/fonts/` : polices locales si besoin.
- `css/style.css` : style principal.
- `js/main.js` : logique interactive.

## Règles

- Ne pas supprimer les fichiers narratifs sans demander.
- Garder le site responsive.
- Ne jamais casser la navigation.
- Tester les liens internes et les médias après modification.
- Garder les noms de fichiers simples, sans espaces ni accents.
- Toujours expliquer les modifications faites.
- Ne pas changer le contenu narratif majeur sans validation.

## Déploiement

Le projet doit rester publiable sur Vercel ou Netlify en statique.

Le fichier `local-media.config.json` sert uniquement au développement local et doit rester ignoré par Git. Pour la publication, utiliser des médias placés dans `assets/images/`, `assets/videos/` et `assets/audio/`.

## Priorité actuelle

Maintenir une structure propre, une navigation stable, des chemins relatifs et une version publiable sans casser la direction artistique sombre / RP / confidentielle.
