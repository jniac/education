
/*
NOTE:

version 1 :
  Le context (ctx) doit être globalement définit.
  
version 2 :
  Le context (ctx) est passé en paramètre de la fonction.
  
*/



// version 1 :

let getPixelColor = (x, y) => {

    let [r, g, b, a] = ctx.getImageData(10, 10, 1, 1).data

    let pixelColor = (r << 16) + (g << 8) + b

    return pixelColor

}



// version 2 :

let getPixelColor = (ctx, x, y) => {

    let [r, g, b, a] = ctx.getImageData(10, 10, 1, 1).data

    let pixelColor = (r << 16) + (g << 8) + b

    return pixelColor

}
