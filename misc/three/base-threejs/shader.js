
camera.fov = 30
camera.updateProjectionMatrix()
camera.position.z = 18

app.prng.reset(976543)

let controls = new THREE.OrbitControls(camera, renderer.domElement)

let xMax = 5
let yMax = 5

let planes = []

for (let y = 0; y < yMax; y++) {

	for (let x = 0; x < xMax; x++) {

		let geometry = new THREE.PlaneGeometry()
		let material = new THREE.RawShaderMaterial({
			uniforms: {
				time: { value: Math.random() * 10 },
				foo: { value: new THREE.Color(app.random(), 0, app.random()) },
				angle: { value: app.random(0, 2 * Math.PI) },
			},
			transparent: true,
			vertexShader: await app.loadFile('shader-vertexShader.glsl'),
			fragmentShader: await app.loadFile('shader-fragmentShader.glsl'),
		})

		let plane = new THREE.Mesh(geometry, material)
		plane.position.x = (x - (xMax - 1) / 2) * 1.03
		plane.position.y = (y - (yMax - 1) / 2) * 1.03
		scene.add(plane)

		planes.push(plane)

	}

}

let createTorus = (color, radius) => {

	let torus = new THREE.Mesh(
		new THREE.TorusGeometry(radius, .01, 12, 96),
		new THREE.MeshBasicMaterial({ color:color }),
	)
	torus.rotation.x = Math.PI / 1.7
	torus.rotation.y = Math.PI / 6
	scene.add(torus)

	let sphere = new THREE.Mesh(
		new THREE.SphereGeometry(app.random([.1, .2, .3]), 36, 36),
		new THREE.MeshBasicMaterial({ color:color }),
	)
	sphere.position.x = radius
	torus.add(sphere)

	let sphere2 = new THREE.Mesh(
		new THREE.SphereGeometry(app.random([.1, .2, .3]), 36, 36),
		new THREE.MeshBasicMaterial({ color:color }),
	)
	sphere2.position.x = -radius
	torus.add(sphere2)

	let speed = app.random(3)

	app.on('update', () => {

		torus.rotation.z += .01 * speed

	})

}

createTorus('#fd3', 4.5)
createTorus('#ff6', 5)
createTorus('#00f', 5.5)

app.on('update', () => {

	for (let plane of planes)
		plane.material.uniforms.time.value += 1/60


})
