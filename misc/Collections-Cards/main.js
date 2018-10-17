
for (let value of values) {

    for (let symbol of symbols) {

        let card = new Card(symbol, value)
        card.createDomElement()

    }

}
