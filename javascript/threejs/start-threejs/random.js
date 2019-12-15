
let { scene } = app

// choisir une graine aléatoire...
// app.prng.randomSeed()
// ...ou non
app.prng.seed = 544383149

let n = 30

let getARandomGeometry = () => {

	// get a polygon (3, 4, 5 or 6 sides)
	if (app.random() < 1 / 2)
		return new THREE.CircleGeometry(1, Math.floor(app.random(3, 7)))

	// get a circle
	if (app.random() < 1 / 2)
		return new THREE.CircleGeometry(1, 48)

	return new THREE.PlaneGeometry()

}

for (let i = 0; i < n; i++) {

	let color = app.mixColors('#f00', '#fc9', app.random())

	if (app.random() < 1 / 4)
		color = app.mixColors('magenta', 'cyan', app.random())

	if (app.random() < 1 / 4)
		color = app.random() < 1 / 2 ? 'black' : 'white'

	let geometry = getARandomGeometry()
	let material = new THREE.MeshBasicMaterial({ color:color })
	let mesh = new THREE.Mesh(geometry, material)

	scene.add(mesh)
	mesh.position.x = app.random(-3, 3)
	mesh.position.y = app.random(-3, 3)

	let size = app.random(.1, 1)
	mesh.scale.set(size, size, size)

	mesh.rotation.z = app.random(2 * Math.PI)

	if (app.random() < 1 / 8) {
		let sinSpeed = app.random(1, 3)
		app.on('update', () => {
			let size2 = size + size * .5 * Math.sin(app.time * sinSpeed)
			mesh.scale.set(size2, size2, size2)
		})
	}

	if (app.random() < 1 / 8)
		app.on('update', () => mesh.rotation.z += 0.01)

}

let xMax = 11
let yMax = 11
let spacing = .3

for (let y = 0; y < yMax; y++) {

	for (let x = 0; x < xMax; x++) {

		let plane = new THREE.Mesh(
			new THREE.PlaneGeometry(.1, .1),
			new THREE.MeshBasicMaterial({ color:'black' }),
		)

		plane.position.x = (x - (xMax - 1) / 2) * spacing
		plane.position.y = (y - (yMax - 1) / 2) * spacing
		scene.add(plane)

	}

}
