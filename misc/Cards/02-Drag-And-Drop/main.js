
import { values, symbols, Card } from './cards.js'
import { CardStack } from './CardStack.js'



let createCards = () => {

    for (let value of values) {

        for (let symbol of symbols) {

            let card = new Card(symbol, value)
            card.createDomElement()

            card.transform.x = 20 + Math.random() * 40
            card.transform.y = 20 + Math.random() * 40

        }

    }

}

createCards()

let stack1 = new CardStack()

stack1.transform.x = 400
stack1.transform.y = 400
