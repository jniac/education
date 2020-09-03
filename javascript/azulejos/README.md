# Azulejo

<image src='./azulejos.jpg' width='500'>

## Brief exercice — Design génératif

A partir du fichier [starter.zip](./starter.zip?raw=true), réalisez une déclinaison originale de la page ([original en ligne](https://jniac.github.io/education/javascript/azulejos/starter/)).

Est attendu :
- une gamme de couleurs originales (appliqué de la page web (CSS) aux motifs de la grille (SVG)).
- un design original de la grille, des différentes tuiles composées aléatoirement.

Les moyens pour y parvenir sont :
- La modification du fichier [style.css](./starter/style.css) pour modifier les codes couleurs (par exemple [ici](./starter/style.css#L8) ou [ici](./starter/style.css#L31)).
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
- le code javascript (main.js), par la modification [des règles](./starter/main.js#L56-L71) qui commandent au sein de la fonction `makeGrid()` l'ajout de nouvelles `div`.

<br><br>
## Notes
### Fichiers
Arborescence des fichiers du dossier "starter":
```
starter
├── assets
│   ├── azulejos.jpg
│   ├── bigstar.svg
│   ├── circle.svg
│   ├── four.svg
│   └── redline-3.svg
├── index.html
├── main.js
└── style.css
```
<br><br>
### Design & Layout :  
  Chaque tuile est composée d'un certain nombre de `div` superposées. Chaque `div` référence une image SVG qui sera utilisé comme motif d'arrière plan. C'est la combinaison aléatoire de ces `div` qui créé le design final. Pour que la superposition permette de riches interactions graphiques, il faut penser à laisser des espaces vides dans les différentes primitives.

<br><br>
### Javascript et Design génératif :  
Le code de la fonction `makeGrid` répète cet ensemble de ligne plusieurs fois :
```javascript
if (Math.random() < 0.2) {
	addNewLayer('assets/circle.svg')
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

<br><br>
### ⚠️ [Avancé] Mode de fusion (blend modes)
Le CSS autorise l'usage de modes de fusion (Produit, Superposition, Incrustation, Différence etc.), ce qui augmente de beaucoup les possibilités offertes par la combinaison des motifs.

L'option n'est pas actuellement permise, mais elle peut être implémenté facilement par en appliquant au code les modifications suivantes :

- la fonction `addNewLayer()`:

```javascript
let addNewLayer = (url, blendMode = 'normal') => {

	let layer = document.createElement('div')
	div.append(layer)
	layer.classList.add('layer')
	layer.style.backgroundImage = `url(${url})`
	layer.style.mixBlendMode = blendMode

}
```

- l'invocation de `addNewLayer()`:


```javascript
if (Math.random() < 0.1) {
	addNewLayer('assets/four.svg', 'difference')
}
```

[Liste des modes de fusion (MDN).](https://developer.mozilla.org/fr/docs/Web/CSS/mix-blend-mode)

<br><br>
## Liens externes
- [Azulejo sur wikipédia](https://en.wikipedia.org/wiki/Azulejo)
- [Mode de fusion sur MDN](https://developer.mozilla.org/fr/docs/Web/CSS/mix-blend-mode)
