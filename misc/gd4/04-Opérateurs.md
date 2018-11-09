# Opérateurs

[MDN Opérateurs](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Op%C3%A9rateurs#Op%C3%A9rateurs_arithm%C3%A9tiques)

Les opérateurs arithmétiques ne sont pas très nombreux : 6

#### `+`
L'addition qui permet d'additionner des nombres
**OU** de "[concaténer](https://fr.wikipedia.org/wiki/Concat%C3%A9nation)" des chaînes de caractères.

Exemples :
```javascript
3 + 2 // 5
'foo' + 'bar' // 'foobar'
'3' + '2' // '32'
```

#### `-`
La soustraction, exemples :
```javascript
3 - 2 // 1
3 - Infinity // -Infinity
```

#### `*`
La multiplication, exemples :
```javascript
3 * 2 // 6
3 * Infinity // Infinity
```

#### `/`
La division, exemples :
```javascript
3 / 2 // 1.5
3 / 0 // Infinity ! et oui les "float" autorisent des opérations que les mathématiques interdisent !
3 / Infinity // 0... forcément si on autorise la division par 0, on autorise aussi la division par Infinity
```

#### `**`
L'exponentiation (ou opérateur de puissance), exemples :
```javascript
3 ** 2 // 9
3 ** 3 // 27
3 ** 10 // 59049 houlà ça grimpe vite !
3 ** 0 // 1
```

# Opérateurs d'affectation
Tous ces opérateurs arithmétiques se décline en opérateurs d'affectation :

```javascript
let a = 2

a += 3 // 5
a *= 3 // 15
a /= 1 / 4 // 60 (diviser par x c'est multiplier par l'inverse de x n'est-ce pas ?)
a **= 2 // 3600 (oh une heure !)
```
