
import { DomTransform } from './DomTransform.js'

let symbols = ['♠','♥','♦','♣']

let values = [
    '7',
    '8',
    '9',
    '10',
    'J',
    'Q',
    'K',
    'A',
]

let mouse = { x:0, y:0, dx:0, dy:0 }

window.addEventListener('mousemove', (event) => {

    let { x, y } = event

    mouse.dx = x - mouse.x
    mouse.dy = y - mouse.y

    mouse.x = x
    mouse.y = y

})

let instances = []

let interactiveZIndex = 0

class Card {

    constructor(symbol, value) {

        this.symbol = symbol
        this.value = value
        this.transform = new DomTransform()

        instances.push(this)

    }

    get zIndex() { return this.div && Number(this.div.style['z-index']) || 0 }
    set zIndex(value) {

        this.div.style['z-index'] = value

    }

    createDomElement() {

        let div = document.createElement('div')
        div.classList.add('card')

        div.style.position = 'absolute'

        if (this.symbol === '♠' || this.symbol === '♣') {

            div.classList.add('black')

        } else {

            div.classList.add('red')

        }

        // div.textContent = this.value + ' ' + this.symbol
        div.innerHTML = `<div class="content">${this.value} ${this.symbol}<div>`

        div.addEventListener('mousedown', (event) => {

            this.zIndex = ++interactiveZIndex

            this.onStartDrag()

            const onMove = () => {

                this.transform.x += mouse.dx
                this.transform.y += mouse.dy

            }

            const onUp = () => {

                this.onStopDrag()

                window.removeEventListener('mousemove', onMove)
                window.removeEventListener('mouseup', onUp)

            }

            window.addEventListener('mousemove', onMove)
            window.addEventListener('mouseup', onUp)

        })

        this.transform.setElement(div)

        document.querySelector('.card-container').append(div)

        Object.assign(this, { div })

    }

    onStartDrag() {

        this.div.classList.add('dragged')

        // this.transform.scale = 1.05
        // this.transform.rotation = -2
        // this.transform.offsetX = -2
        // this.transform.offsetY = -4

        TweenMax.to(this.transform, .5, {

            scale: 1.05,
            rotation: -2,
            offsetX: -2,
            offsetY: -4,

            ease: x => 1 - (1 - x) ** 4,

        })

    }

    onStopDrag() {

        this.div.classList.remove('dragged')

        // this.transform.scale = 1
        // this.transform.rotation = 0
        // this.transform.offsetX = 0
        // this.transform.offsetY = 0

        TweenMax.to(this.transform, .5, {

            scale: 1,
            rotation: 0,
            offsetX: 0,
            offsetY: 0,

            ease: x => 1 - (1 - x) ** 4,

        })

    }

}

export {

    values,
    symbols,
    Card,

}
