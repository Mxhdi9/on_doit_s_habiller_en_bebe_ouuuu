# Vidéo directe pour FiveM

Le site ASCALON est statique (HTML/CSS/JavaScript), sans framework ni compilation.
Le vrai fichier fourni est conservé sans conversion dans `videos/video.webm` à la racine.
Ne pas créer de dossier `public/` pour cette intégration : l'ensemble du site est servi depuis la racine.

- Fichier : 12 770 426 octets ; durée 58,475 s ; VP9 1920 × 1080, audio Opus.
- SHA-256 : `10db22400d5ccb51e6a4a82ce0ae683e6cbc53f947de4d76aa80f90a543582da`.
- URL de production Vercel : https://on-doit-s-habiller-en-bebe-ouuuu.vercel.app/videos/video.webm
- URL souhaitée sur domaine personnalisé : https://ascalonprogramme.com/videos/video.webm

La vidéo est un fichier statique du CDN Vercel. Aucun lecteur, bouton, lien de navigation,
proxy serverless ou changement de l'OS fictif n'est ajouté. `vercel.json` applique uniquement
à cette URL le type `video/webm`, la lecture inline et les en-têtes CORS publics (GET, HEAD,
OPTIONS, Range). Vercel détermine Content-Length et Content-Range à partir du fichier réel.

## Publication et remplacement

Le dépôt GitHub connecté au projet Vercel déclenche un déploiement de production après un
push sur `main`. Conserver la configuration statique existante : preset `Other`, racine du
dépôt, aucune commande de compilation, répertoire de sortie racine (pas de dossier public).
Le fichier `videos/video.webm` doit être ajouté au commit ; il n'est pas ignoré par Git.
Le serveur `preview-server.cjs` est seulement destiné à l'aperçu local et n'est pas exécuté sur Vercel.

Pour remplacer la vidéo : copier le nouveau fichier sur `videos/video.webm`, conserver ce nom,
puis commit et push. Si le déploiement automatique est désactivé : ouvrir le projet existant
Vercel > Deployments et déployer le dernier commit de production. Une alternative avec la
CLI Vercel connectée au projet existant est `vercel --prod` depuis la racine du dépôt.

## Domaine personnalisé

Au contrôle du 15 novembre 2026, `ascalonprogramme.com` renvoie NXDOMAIN, confirmé par les
résolveurs Google et Cloudflare. Ce nom ne peut donc pas encore servir la vidéo.
Dans le projet Vercel existant > Settings > Domains, ajouter ce domaine si tu le possèdes,
puis recopier chez son fournisseur DNS les enregistrements exacts indiqués par Vercel.
Attendre que Vercel affiche une configuration valide et le certificat HTTPS actif.
Le même déploiement servira alors `/videos/video.webm`, sans modification du site.
Ne pas configurer ce domaine uniquement comme redirection vers la page d'accueil.

## Contrôles HTTP après publication (PowerShell)

```powershell
curl.exe -I "https://on-doit-s-habiller-en-bebe-ouuuu.vercel.app/videos/video.webm"
curl.exe -D - -o NUL -H "Range: bytes=0-1023" -H "Origin: https://cfx-nui-test" "https://on-doit-s-habiller-en-bebe-ouuuu.vercel.app/videos/video.webm"
curl.exe -I -X OPTIONS -H "Origin: https://cfx-nui-test" -H "Access-Control-Request-Method: GET" -H "Access-Control-Request-Headers: Range" "https://on-doit-s-habiller-en-bebe-ouuuu.vercel.app/videos/video.webm"
```

Attendus : HEAD 200, Content-Type video/webm, GET partiel 206 avec Content-Range
`bytes 0-1023/12770426`, Content-Length 1024, Access-Control-Allow-Origin `*` ;
OPTIONS 204 avec les autorisations CORS. Une requête GET complète doit renvoyer exactement
le fichier original (SHA-256 ci-dessus), sans HTML, cookies ni redirection.
Effectuer les mêmes contrôles sur le domaine personnalisé une fois ses DNS configurés.

Une éventuelle protection Vercel (authentification, règle de pare-feu ou challenge anti-bot)
peut intercepter une requête avant le fichier : si FiveM reçoit une page de vérification,
contrôler les événements Firewall du projet et ajuster seulement la règle concernée pour
ce chemin public. Les en-têtes CORS ne contournent pas cette protection.

## Utilisation FiveM

Transmettre l'URL directe complète au responsable du serveur et la coller dans le champ URL
du lecteur qui accepte les fichiers WebM. La commande dépend de la ressource installée ;
il n'existe pas de commande de lecture à inventer sans connaître cette ressource.
Le fichier est décodé correctement dans Chrome (VP9/Opus). Un essai dans le lecteur du
serveur FiveM reste nécessaire, car sa version CEF et son script ne sont pas disponibles ici.

Documentation :
- https://vercel.com/docs/builds/configure-a-build
- https://vercel.com/kb/guide/how-to-enable-cors
- https://vercel.com/docs/domains/working-with-domains/add-a-domain
