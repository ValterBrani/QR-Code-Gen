# QR Code Generator

🇫🇷 Français | [🇬🇧 English](README.md)

## Fonctionnalités

- Génération de QR code à partir d’un texte ou d’une URL
- Options avancées (taille, niveau de correction, couleurs)
- Téléchargement en PNG, JPG ou SVG
- Affichage/masquage des options
- Raccourci clavier : `Ctrl+Enter` (ou `Cmd+Enter`) pour générer

## Lancer le projet

### Option simple
1. Ouvrir `index.html` dans un navigateur.

### Option recommandée (serveur local)
Si vous avez Node.js :

```bash
npx serve .
```

Puis ouvrir l’URL affichée (souvent `http://localhost:3000`).

## Dépendance externe

Le projet utilise la bibliothèque `qrcodejs` via CDN :

- https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js

## Agent custom

Un prompt d’agent expert QR est disponible ici :

- [.github/prompts/qr-expert.prompt.md](.github/prompts/qr-expert.prompt.md)

Tu peux l’utiliser dans Copilot Chat pour obtenir des revues ciblées et des suggestions d’amélioration du générateur QR.

## Notes

- Projet 100% front-end, sans backend.
- Aucune étape de build n’est nécessaire.

## Licence

Ce projet est sous licence MIT. Voir [LICENSE](LICENSE).
