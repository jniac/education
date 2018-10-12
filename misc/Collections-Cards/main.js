
let card1 = new Card('♠', '10')
let card2 = new Card('♥', 'A')

card1.createDomElement()
card2.createDomElement()

for (let i = 0; i < 15; i++) {

    let card = new Card('♥', i)
    card.createDomElement()

}

for (let value of values) {

    let card = new Card(value, value)
    card.createDomElement()

}
