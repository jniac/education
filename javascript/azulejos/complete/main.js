
let rotateTile = (element) => {

	// alt + shift + L > |
	// altGr + ?? > |
	let a = (element.a || 0) + 90
	element.a = a
	element.style.transform = 'rotate(' + a + 'deg)'

}

let rotateRandomTile = () => {

	let tiles = document.querySelectorAll('section#s2 div.tile')
	let index = Math.floor(Math.random() * tiles.length)
	let randomTile = tiles[index]
	rotateTile(randomTile)

}

setInterval(rotateRandomTile, 3000)





let makeGrid = (col, row, tileSize) => {

	let container = document.querySelector('section#s3 div.grid')
	container.style.width = (tileSize * col) + 'px'
	container.style.height = (tileSize * row) + 'px'

	for (let i = 0; i < col * row; i++) {

		let div = document.createElement('div')
		div.classList.add('tile')
		div.style.width = tileSize + 'px'
		div.style.height = tileSize + 'px'
		container.append(div)

		let addImage = src => {

			let layer = document.createElement('div')
			layer.classList.add('layer')
			layer.style.backgroundImage = `url(${src})`
			div.append(layer)

		}

		if (Math.random() < .3)
			addImage('assets/circle.svg')

		if (Math.random() < .5)
			addImage('assets/bigstar.svg')

		if (Math.random() < .5)
			addImage('assets/flower.svg')

		if (Math.random() < .5)
			addImage('assets/flower2.svg')

		if (Math.random() < .5)
			addImage('assets/star8.svg')

		if (Math.random() < .15)
			addImage('assets/redline-1.svg')

		if (Math.random() < .15)
			addImage('assets/redline-2.svg')

		if (Math.random() < .15)
			addImage('assets/redline-3.svg')

		if (Math.random() < .15)
			addImage('assets/four.svg')

	}

}

makeGrid(8, 6, 120)
