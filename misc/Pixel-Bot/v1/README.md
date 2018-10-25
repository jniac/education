# PixelBot v1

[online demo](https://jniac.github.io/e-artsup/misc/Pixel-Bot/v1/)

![](./screenshots/Pixel-Bot-026.png)
![](./screenshots/Pixel-Bot-027.png)
![](./screenshots/Pixel-Bot-034.png)
![](./screenshots/Pixel-Bot-035.png)

# Getting Started

[zip/PixelBot-Starter.zip](zip/PixelBot-Starter.zip?raw=true)

```javascript
class LangtonAnt extends PixelBot {

    start() {

        this.x = 150
        this.y = 150
        this.color1 = '#fc0'
        this.color2 = '#0cf'

    }

    update() {

        if (this.pixelColor.r < .5) {

            this.turnLeft()
            this.setPixelColor(this.color1)

        } else {

            this.turnRight()
            this.setPixelColor(this.color2)

        }

        this.move()

    }

}

new LangtonAnt()
new LangtonAnt().set({
    x: 100,
    y: 200,
})
```

# serveur local
La page index.html nécessite l'existence d'un serveur local pour télécharger les resources locales (`PixelBot.load(url)`).  
Il existe plein de solutions pour servir des fichiers locaux en http. Je propose une solution NodeJS :

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
