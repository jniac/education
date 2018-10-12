
/*
NOTE:

version 1 :
  Le context (ctx) doit être globalement définit.
  
version 2 :
  Le context (ctx) est passé en paramètre de la fonction.
  
*/



// version 1 :

let getPixelColor = (x, y) => {

    let [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data

    let rgb = (r << 16) + (g << 8) + b
    let hex = rgb.toString(16).padStart(6, '0')

    return { r, g, b, a, rgb, hex }

}



// version 2 :

let getPixelColor = (ctx, x, y) => {

     let [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data

    let rgb = (r << 16) + (g << 8) + b
    let hex = rgb.toString(16).padStart(6, '0')

    return { r, g, b, a, rgb, hex }

}
