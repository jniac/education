# Note à propos de la taille de fichiers.

Il arrive souvent, qu'une fois les resources du projet rassemblées sous la forme d'une archive ZIP, l'on s'aperçoive que l'ensemble pèse trop lourd. Ici la limite a été fixée à 10Mo (ce qui est déjà bcp pour une expérience web).

### Comment gagner en taille de fichier ?

Il faut commencer par identifier les fichiers volumineux. Le poids des fichiers texte contenant le code étant généralement négligeable (quelques Ko), il s'agit des resources binaires (assets) : image (JPEG/PNG), vidéo (MP4).

2 premières options s'offrent alors :
- augmenter la compression des ressources (et donc nécessairement perdre en qualité)
- réduire la résolution des documents (et donc nécessairement perdre en qualité)

Si cela ne suffit pas il faut alors envisager de :
- réduire le nombre des resources

Changer la compression et la résolution suffit généralement à résoudre un problème de taille (un fichier compressé peut peser 10 fois moins que l'original).

### Quelques ordres de grandeur : 
- Une image de type photo, prévue pour être vue en plein écran, doit avoir une résolution maximum de 2500 x 2500px, doit être compressé en JPG (ex qualité 60/100) et peser moins de 1Mo.
- Une image de type logotype (transparence, applats de couleurs) doit être enregistré en PNG (ou mieux en SVG mais c'est plus compliqué à produire). La résolution doit dépendre de la taille prévue pour l'affichage (une icône : max 256 x 256px, un logo : max 1000 x 1000px). Une image PNG doit peser moins de 1Mo (généralement quelques centaines de Ko).
- Une vidéo prévue pour être vue en plein écran, et durer quelques dizaines de secondes, doit peser de 5 à 8Mo.

### Comment re-compresser une vidéo ? 
- Avec Adobe Media Encoder
- Avec des outils en ligne, par exemple https://video.online-convert.com/fr/convertir-en-mp4  
  Ce dernier outil est très complet, il permet notamment couper la vidéo, de définir une taille approximative finale.
  
