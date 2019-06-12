
let random = (min, max) => min + (max - min) * Math.random()

let randomBlueColor = () => {

	let h = Math.round(random(180, 220))
	let s = 50
	let l = Math.round(random(30, 80))
	let color = `hsl(${h}, ${s}%, ${l}%)`

	return color

}

let getColor = () => {

	if (Math.random() < .1) {
		return '#c00'
	} else {
		return randomBlueColor()
	}

}

let xMax = 5
let yMax = 5

for (let y = 0; y < yMax; y++) {

	for (let x = 0; x < xMax; x++) {

		let card = new THREE.Mesh(
			new THREE.PlaneGeometry(),
			new THREE.MeshBasicMaterial({ color:getColor() }),
		)

		let cone = new THREE.Mesh(
			new THREE.ConeGeometry(.4, 2, 32),
			new THREE.MeshBasicMaterial({ color:getColor() }),
		)
		cone.position.z = 1
		cone.rotation.x = Math.PI / 2
		card.add(cone)


		card.position.x = (x - (xMax - 1) / 2) * 1.1
		card.position.y = (y - (yMax - 1) / 2) * 1.1

		scene.add(card)

	}

}
