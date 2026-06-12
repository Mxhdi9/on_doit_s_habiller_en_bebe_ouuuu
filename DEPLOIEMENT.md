# Deploiement ASCALON

Le site ASCALON est un site statique pur : HTML, CSS, JavaScript et fichiers dans `assets/`.
Il est pret pour un VPS, Vercel, Netlify, ou un simple serveur Nginx/Apache.

## Structure a conserver

```txt
ASCALON/
  index.html
  css/style.css
  js/main.js
  robots.txt
  package.json
  preview-server.cjs
  assets/
    audio/
      ascalon-ambient.mp3
    images/
      ascalon-logo.svg
      dex-reveal.svg
      world-map-relief.png
      archive/
        accueil.svg
        cam01-exterieur.svg
        cam02-entree.svg
        cam03-couloir.svg
        cam04-salon.svg
        cam05-cuisine.svg
        cam06-chambre.svg
      operations/
        no-signal.svg
        night-glass.jpg
        red-harbor.jpg
        altiplano.jpg
        ...
```

Tous les chemins utilises dans le code sont relatifs, par exemple :

```html
./assets/images/world-map-relief.png
```

Il ne doit rester aucun chemin local de machine : uniquement des chemins commencant par `./assets/`.

## Lancement local

Avec Node installe :

```bash
npm start
```

ou :

```bash
node preview-server.cjs 4181
```

Puis ouvre :

```txt
http://127.0.0.1:4181/
```

## VPS avec Nginx

Copie tout le dossier `ASCALON/` sur ton VPS, par exemple :

```txt
/var/www/ascalon/
```

Exemple de bloc Nginx :

```nginx
server {
    listen 80;
    server_name ton-domaine-ou-ip;

    root /var/www/ascalon;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Recharge Nginx apres modification :

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Acces RP

Code d'entree actuel : `7236`

## Indexation

`index.html` contient `noindex, nofollow`.
`robots.txt` bloque aussi l'indexation.

Ce n'est pas une securite serveur, mais c'est propre pour un ARG discret.
