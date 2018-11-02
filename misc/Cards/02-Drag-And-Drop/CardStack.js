
import { DomTransform } from './DomTransform.js'

class CardStack {

    constructor() {

        let div = document.createElement('div')

        div.classList.add('card-stack')

        document.querySelector('.card-container').append(div)

        let transform = new DomTransform(div)

        Object.assign(this, {

            div,
            transform,

        })

    }

}

export { CardStack }
export default CardStack
