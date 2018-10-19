# Boucles

### Boucles `for`

soit un tableau:
```javascript
let cardSymbols = ['♠','♥','♦','♣']
```

- une première (et élégante) manière de récupérer toutes les valeurs d'un tableau :
```javascript
for (let symbol of cardSymbols) {

    console.log(symbol)

}
```

- une façon historique
```javascript
for (let i = 0; i < cardSymbols.length; i++) {

    let symbol = cardSymbols[i]

    console.log(symbol)

}
```
