import { changeThatIcon } from './changeThatIcon.js'
import { changeThatSvg } from './changeThatSvg.js'

// réaliser 11 clones à partir d'un noeud "source"
const source = document.querySelector('div.cell')

const max = 11
for (let index = 0; index < max; index++) {
    const clone = source.cloneNode(true)
    document.querySelector('main').append(clone)
}

// parcourir l'ensemble des <div.cell/>, 
// puis récupérer la balise <object/> "interne"
// pour pouvoir modifier "onload" le contenu du svg  
const cells = document.querySelectorAll('div.cell')
for (const cell of cells) {

    const object = cell.querySelector('object')
    object.onload = () => {
        const svg = object.contentDocument.querySelector('svg')
        changeThatSvg(svg)
    }

    const div = cell.querySelector('div')
    changeThatIcon(div)
}
