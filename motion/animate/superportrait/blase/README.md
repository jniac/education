# affiche ton blase !

fichier démo:
[blase.fla](https://github.com/jniac/e-artsup/blob/master/motion/animate/superportrait/blase/blase.fla?raw=true)

## Animate:

Le projet :
- ActionScript 3.0 (bien qu'on s'en cogne en vrai)
- format document 1000 x 1000 px
- format portrait 500 x 500 px (250px de marges tournantes)
- 12 fps


![](./animate-instructions-0.jpg)

La technique :  

Animer image par image veut dire lâcher le pad ou la souris pour prendre un stylet. Pour naviguer dans le projet il va être **indispensable** d'utiliser le clavier. Les actions importantes sont :
- **F5** insérer une image (normale, c'est à dire prolonger une image d'une "frame")
- **F6** insérer une image-clé (en dupliquant la clé précédente)
- **F7** insérer une image-clé **vide** (vide ! ça veut dire devoir tout redessiner à chaque nouvelle frame... et oui !)
- **/** (macOS) reculer d'une image (à configurer, voir ci dessous)
- **+** (macOS) avancer d'une image (à configurer, voir ci dessous)
- **Enter** jouer (ou arrêter) la séquence


![](./animate-instructions-1.jpg)

<br><br>

rappel configuration de l'interface :
régler [/] [+] comme commandes pour reculer / avancer d'une image :

![](./animate-instructions-2.jpg)

<br><br>

---

<br><br>

note:
### plugin Adobe Media Encoder
Pour pouvoir encoder en [WebM (format open source Chrome Opera Firefox)](https://fr.wikipedia.org/wiki/WebM)
http://www.fnordware.com/WebM/

### Atom.io video preview
https://atom.io/packages/videoplayer  
Installer le package sous Atom :
- Settings: `cmd/ctrl + ,`
- **+ Install**
- search : _videoplayer_ + install
