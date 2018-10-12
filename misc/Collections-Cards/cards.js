
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

class Card {

    constructor(symbol, value) {

        this.symbol = symbol
        this.value = value

    }

    createDomElement() {

        let div = document.createElement('div')
        div.classList.add('card')

        if (this.symbol === '♠' || this.symbol === '♣') {

            div.classList.add('black')

        } else {

            div.classList.add('red')

        }

        div.textContent = this.value + ' ' + this.symbol

        document.body.append(div)

    }

}
