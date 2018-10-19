javascript
# Variables

déclarer une variable :
```javascript
let myVar = 'hello'
```

les types disponibles sont :
```javascript
let aString = 'hello 🤗' // "string" (chaîne de caractères)
let aNumber = 3.14 // "number" (float 64 == "double" en C#)
let aBoolean = true // "boolean"
```

### Premiers "Objets" (tableau & Objet)
```javascript
// un tableau de valeur
let cardSymbols = ['♠','♥','♦','♣']

// un tableau de nombres
let fibonacci = [1, 1, 2, 3, 5, 8]

// un objet, par exemple la fourmi de Langton
let ant = {
    x: 150,
    y: 100,
    orientation: 'N'
}

```

### accéder à une propriété...

#### ... d'un tableau
```javascript
cardSymbols[i] // où "i" est un nombre, par ex:
cardSymbols[0] // '♠'
```

note:
- le premier élément d'un tableau a pour index `0` ! (et non pas `1` comme l'intuition le suggère)

```javascript
// accéder "dynamiquement" à la longueur/taille d'un tableau
cardSymbols.length // 4
```
#### ... d'un "objet"
```javascript
// accéder à la propriété "x" de "ant"
ant.x // 150

// il est également possible d'accéder à une propriété à la manière d'un tableau: [key] où "key" est une chaîne de caractère
ant['x'] // 150
```
