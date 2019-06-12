
let xMax = 6
let yMax = 4

let numberOfBombs = 5
let numberOfTrolls = 3

let cards = []

let getCard = (x, y) => {

	if (x < 0 || x >= xMax || y < 0 || y >= yMax)
		return null

	return cards[y * xMax + x]

}

let cardIsABomb = (x, y) => {

	if (x < 0 || x >= xMax || y < 0 || y >= yMax)
		return false

	return getCard(x, y).isBomb == true

}

for (let y = 0; y < yMax; y++) {

	for(let x = 0; x < xMax; x++) {

		let card = new THREE.Mesh(
			new THREE.PlaneGeometry(),
			new THREE.MeshBasicMaterial({ color:'purple', map:app.loadTexture('assets/dots.png') }),
		)

		let verso = new THREE.Mesh(
			new THREE.PlaneGeometry(),
			new THREE.MeshBasicMaterial({ color:'#6cf' }),
		)
		verso.rotation.y = Math.PI
		card.verso = verso
		card.add(verso)

		card.position.x = (x - (xMax - 1) / 2) * 1.1
		card.position.y = (y - (yMax - 1) / 2) * 1.1

		card.isBomb = false
		card.isTroll = false

		card.computeBombNumber = () => {

			card.bombNumber = 0
			if (cardIsABomb(x + 1, y + 1)) card.bombNumber++
			if (cardIsABomb(x + 1, y + 0)) card.bombNumber++
			if (cardIsABomb(x + 1, y - 1)) card.bombNumber++
			if (cardIsABomb(x + 0, y - 1)) card.bombNumber++
			if (cardIsABomb(x - 1, y - 1)) card.bombNumber++
			if (cardIsABomb(x - 1, y + 0)) card.bombNumber++
			if (cardIsABomb(x - 1, y + 1)) card.bombNumber++
			if (cardIsABomb(x + 0, y + 1)) card.bombNumber++

		}

		scene.add(card)

		card.on('pointer-over', () => {
			TweenMax.to(card.scale, .3, { x:1.08, y:1.08 })
		})
		card.on('pointer-out', () => {
			TweenMax.to(card.scale, .3, { x:1, y:1 })
		})
		card.on('pointer-click', () => {
			TweenMax.to(card.rotation, .5, { y:Math.PI, ease:Back.easeOut.config(1.7) })
		})

		cards.push(card)

	}

}



let innocentCards = [...cards] // '...' permet de "cloner" le tableau "cards"



let bombCards = []

// https://www.desmos.com/calculator/i6kwlsrerc
let shaky = (x, f = 5, p = 3, s = 1) => s * Math.sin(x * Math.PI * f) * ((1 - x) ** p)

for (let i = 0; i < numberOfBombs; i++) {

	let randomIndex = Math.floor(Math.random() * innocentCards.length)
	let bombCard = innocentCards.splice(randomIndex, 1)[0]

	bombCard.verso.material.color.set('#fc0')
	bombCard.verso.material.map = app.loadTexture('assets/bomb.png')
	bombCard.isBomb = true

	bombCard.on('pointer-click', () => {

		boom(40, pointer.intersection.point, ['#ffcc00', 'white', 'black'])

		let f1 = app.random(8, 16)
		let f2 = app.random(8, 16)

		let ease = (t) => {
			let t1 = shaky(t, f1, 5)
			let t2 = shaky(t, f2, 5, -1)
			camera.position.x = .5 * t1 - .5 * t2
			camera.position.y = .5 * t1 + .5 * t2
		}
		TweenMax.from(camera.position, 2, { ease:ease })

	})

	bombCards.push(bombCard)

}

for (let y = 0; y < yMax; y++) {

	for(let x = 0; x < xMax; x++) {

		let card = getCard(x, y)

		card.computeBombNumber()

		if (card.isBomb == false)
			card.verso.material.map = app.loadTexture('assets/number_' + card.bombNumber + '.png')
	}

}



let trollCards = []

for (let i = 0; i < numberOfTrolls; i++) {

	let randomIndex = Math.floor(Math.random() * innocentCards.length)
	let trollCard = innocentCards.splice(randomIndex, 1)[0]

	trollCard.verso.material.color.set('#ffccec')
	trollCard.verso.material.map = app.loadTexture('assets/troll-face.png')
	trollCard.isTroll = true

	trollCards.push(trollCard)

	trollCard.on('pointer-click', () => {

		boom(10, pointer.intersection.point, ['#ffccec', 'red', 'black'])

	})

}

let boomDefaultCenter = new THREE.Vector3(0, 0, 0)
let boomDefaultColors = ['red', 'blue', 'yellow']
let boom = (count = 10, center = boomDefaultCenter, colors = boomDefaultColors) => {

	for (let i = 0; i < count; i++) {

		let color = app.random(colors)
		let mapUrl = app.random(['assets/art_Cross-Bold.png', 'assets/art_Cross-Normal.png'])

		let geometry = new THREE.PlaneGeometry()
		let material = new THREE.MeshBasicMaterial({ color:color, map:app.loadTexture(mapUrl), transparent:true })

		let p = new app.Particle(geometry, material)

		p.update = () => p.scale.multiplyScalar(.9)

		p.position.copy(center)
		p.rotation.z = Math.PI * app.random(-1, 1)

		p.friction = app.random(.95, .99)
		p.tMax = app.random(.5, 1)

		let s = app.random(3, 9)
		let a = app.random(0, Math.PI * 2)
		p.velocity.x = s * Math.cos(a)
		p.velocity.y = s * Math.sin(a)

		p.rotationVelocity.z = 2 * Math.PI * app.random(-1, 1)
	}

}
