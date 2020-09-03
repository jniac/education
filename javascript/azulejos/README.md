# Azulejo

## Brief exercice — Design génératif

A partir du fichier [starter.zip](./starter.zip?raw=true), réalisez une déclinaison originale de la page ([original en ligne](https://jniac.github.io/education/javascript/azulejos/starter/)).

Est attendu : 
- une gamme de couleurs originales (appliqué de la page web (CSS) aux motifs de la grille (SVG)).
- un design original de la grille, des différentes tuiles composées aléatoirement.

Les moyens pour y parvenir sont :
- le design des [primitives (svg)](./starter/assets) via n'importe quel logiciel (illustrator, figma etc.)
	- forme (conseil: rester simple, mais multiplier le nombre de primitives pour augmenter les combinaisons possibles)
	- couleur (en prenant soin de mettre en place des couleurs dominantes et d'autres sous forme de rehauts)
  <br>
  <div style="display: flex; width: 100%">
	<img width="100px" src="starter/assets/bigstar.svg">
	<img width="100px" src="starter/assets/circle.svg">
	<img width="100px" src="starter/assets/four.svg">
	<img width="100px" src="starter/assets/redline-3.svg">
  </div>
- le code javascript [(main.js)](./starter/main.js#L56-L71), par la modification des règles qui commandent au sein de la fonction `makeGrid` l'ajout de nouvelles `div`.

## Mémo
### Design & Layout :  
  Chaque tuile est composée d'un certain nombre de `div` superposées. Chaque `div` référence une image SVG qui sera utilisé comme motif d'arrière plan. C'est la combinaison aléatoire de ces `div` qui créé le design final. Pour que la superposition permette de riches interactions graphiques, il faut penser à laisser des espaces vides dans les différentes primitives.

### Javascript et Design génératif :  
  Le code de la fonction `makeGrid` répète cet ensemble de ligne plusieurs fois : 
```javascript
if (Math.random() < 0.2) {
	appendImage('assets/circle.svg')
}
```
Ce code peut être intérprété comme suit :  
```
(concernant la <div> actuellement générée) 
Il y a 20% de chance que
  que l'image assets/circle.svg soit ajoutée.
```

Pour contrôler l'apparition des différents motifs SVG, il faut ajuster la probabilité d'apparition, ex:
- `if (Math.random() < 0.9) {...}`: très fréquent (90% de chance d'apparaître)
- `if (Math.random() < 0.1) {...}`: rare (10% de chance d'apparaître)

<image src='./azulejos.jpg' width='500'>

[Azulejo sur wikipédia](https://en.wikipedia.org/wiki/Azulejo)
