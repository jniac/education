

let bg = new THREE.Mesh(
	new THREE.PlaneGeometry(20, 20),
	new THREE.MeshBasicMaterial({ color:'red' }),
)
scene.add(bg)

let rect = new THREE.Mesh(
	new THREE.PlaneGeometry(20, .01),
	new THREE.MeshBasicMaterial({ color:'black' }),
).addTo(scene)

scene.add(new THREE.Mesh(
	new THREE.CircleGeometry(.05, 32),
	new THREE.MeshBasicMaterial({ color:'black' }),
))

scene.add(new THREE.Mesh(
	new THREE.RingGeometry(2 - .005, 2 + .005, 96, 1),
	new THREE.MeshBasicMaterial({ color:'black' }),
))

let circle = new THREE.Mesh(
	new THREE.CircleGeometry(0.5, 48),
	new THREE.MeshBasicMaterial({ color:'black' }),
)
scene.add(circle)

let radius = 2
let angle = Math.PI / 4
let angleVelocity = 0.01

document.querySelector('[name=angle]').oninput = () => {

	angleVelocity = parseFloat(document.querySelector('[name=angle]').value)

}

app.on('update', () => {

	rect.rotation.z += .001

	angle += angleVelocity

	circle.position.x = radius * Math.cos(angle)
	circle.position.y = radius * Math.sin(angle)

})






// the particles part:

// https://www.desmos.com/calculator/xbscadjht9
let scaleFunction = x => (1 - x ** (x * 5)) * 1.1

let particleGeometry = new THREE.CircleGeometry(1, 6)
let particleMaterials = [
	{ weight:8, material:new THREE.MeshBasicMaterial({ color:'white' }) },
	{ weight:2, material:new THREE.MeshBasicMaterial({ color:'#fc6' }) },
	{ weight:1, material:new THREE.MeshBasicMaterial({ color:'#009' }) },
]

let frequence = 10
let shoot = () => {

	let bullet = new app.Particle(
		particleGeometry,
		app.random(particleMaterials).material,
	)

	bullet.rotation.z = app.random(-Math.PI, Math.PI)
	bullet.velocity.x = circle.position.x
	bullet.velocity.y = circle.position.y
	bullet.tMax = app.random(1, 3)

	let bulletSize = app.random(.02, .2)
	bullet.update = () => {
		let s = bulletSize * scaleFunction(bullet.tProgress)
		bullet.scale.set(s, s, s)
	}

	setTimeout(shoot, 1000 / frequence)
}

shoot()

document.querySelector('[name=frequence]').oninput = () => {

	frequence = parseFloat(document.querySelector('[name=frequence]').value)

}
