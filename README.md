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
- En local, `preview-server.cjs` peut servir des médias depuis ton PC via `local-media.config.json`. Pour Vercel, copie les fichiers finaux dans le projet, par exemple `assets/images/subjects/nadir.png`, `assets/images/subjects/panam.png`, `assets/images/subjects/cain-voss.png`, `assets/images/archive/cam1.png` à `cam6.png`, et `assets/videos/archive/camchambre1.mp4`.
