# Function

<br>

## I. Déclaration

Il existe en javascript (au moins) 3 façon de déclarer une fonction

<br>


#### 1) Arrow functions
une façon "moderne" ([Arrow Function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)) :

```javascript
// une fonction (pas très utile) pour calculer le carré d'un nombre "x" donné
let squared = (x) => {

    return x * x

}
```

<br>

#### 2) Concise Arrow functions
une version très courte, très concise, permettant une lecture rapide :
```javascript
let squared = x => x * x
```
Notez l'absence ici du mot clé `return`

<br>

#### 3) Classic function declaration
une façon "classique" de déclarer une fonction
```javascript
function squared(x) {

    return x * x

}
```

<br>

## II. Invocation

**"invoquer"** ou **"appeler"** une fonction (mais invoquer ça fait plus magie noire) :
```javascript
squared(3) // 9
squared(10) // 100
```
puisqu'ici les résultats retournés par la fonction `squared` sont des nombres il est possible de réaliser des opérations arithmétiques entre ces résultats, aussi personne ne sera choqué de voir :
```javascript
squared(3) * squared(10) // 900
```
