# ASCALON

Site statique / ARG RP ASCALON en HTML, CSS et JavaScript pur, prêt pour GitHub et Vercel.

## Structure

- `index.html`
- `pages/`
- `css/style.css`
- `js/main.js`
- `assets/images/`
- `assets/videos/`
- `assets/audio/`
- `assets/fonts/`

Toutes les images utilisées par le site restent dans `./assets/images/` avec des chemins relatifs. L'audio global reste dans `./assets/audio/`.

## Lancement local

```bash
npm start
```

Puis ouvre :

```txt
http://127.0.0.1:4181/
```

## Déploiement Vercel

1. Pousse le projet sur GitHub.
2. Dans Vercel, crée un nouveau projet depuis ce dépôt GitHub.
3. Garde les réglages par défaut : framework `Other`, build command vide, output directory vide.
4. Lance le déploiement.

Vercel servira directement `index.html`.

## Branches conseillées

- `main` : version officielle publiée.
- `dev` : version de test avant publication.

## Premier commit GitHub

Depuis le dossier du projet :

```bash
git init
git add .
git commit -m "Initial commit - ASCALON website"
git branch -M main
git remote add origin https://github.com/TON-PSEUDO/ascalon-site.git
git push -u origin main
```

Remplace `TON-PSEUDO` par ton identifiant GitHub.

## Notes

- Code d’entrée RP actuel : `7236`
- Le site bloque l’indexation via `robots.txt` et la balise `noindex`.
- Les visuels d’opérations utilisent le fichier de secours `assets/images/operations/no-signal.svg` tant que les images finales ne sont pas ajoutées.
- Pour Vercel, les médias finaux doivent être physiquement présents dans le repo. Lance `COPIER_MEDIAS_VERCEL.cmd` avant le commit pour placer les PNG/MP4 dans `assets/images/` et `assets/videos/`.
