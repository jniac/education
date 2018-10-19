# PixelBot v1

[online demo](https://jniac.github.io/e-artsup/misc/Pixel-Bot/v1/)

![](./screenshots/Pixel-Bot-026.png)
![](./screenshots/Pixel-Bot-027.png)
![](./screenshots/Pixel-Bot-034.png)
![](./screenshots/Pixel-Bot-035.png)

# serveur local
La page index.html nécessite l'existence d'un serveur local pour télécharger les resources locales (`PixelBot.load(url)`).  
Il existe plein de solution pour servir des fichiers locaux. Je propose une solution NodeJS : 

- installer [node & npm](https://nodejs.org/en/) (prendre la version la plus avancée, et suivre les instructions de l'installateur)
- installer (globalement) `super-quick-static`: 
```shell
$ npm install -g super-quick-static
```
- lancer un serveur local :
```shell
$ npm super-quick-static
```
voilà !

[http://localhost:8000](http://localhost:8000)
