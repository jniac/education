
let { scene } = app

let xMax = 15
let yMax = 15
let spacing = .3

for (let y = 0; y < yMax; y++) {

	for (let x = 0; x < xMax; x++) {

		let plane = new THREE.Mesh(
			new THREE.PlaneGeometry(.05, .05),
			new THREE.MeshBasicMaterial({ color:'black' }),
		)

		plane.position.x = (x - (xMax - 1) / 2) * spacing
		plane.position.y = (y - (yMax - 1) / 2) * spacing

		scene.add(plane)

	}

}
