
let loader = new THREE.FBXLoader()

let hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x000033, .7)
scene.add(hemisphereLight)

let light = new THREE.PointLight(0xffff66, 1, 100)
light.position.set(5, 5, 0)
scene.add(light)

let ambientLight = new THREE.AmbientLight(0xffffff, .2)
scene.add(ambientLight)

loader.load('assets/blob.fbx', (fbx) => {

	fbx.scale.set(.006, .006, .006)
	scene.add(fbx)

	let [nBlob] = scene.query('Null_Blob')
	let [nIcosa] = scene.query('Null_Icosa')

	app.on('update', () => {

		nBlob.rotation.x += .001
		nBlob.rotation.y += .001

		nIcosa.rotation.x += .005
		nIcosa.rotation.y += .05

	})

})






let n1 = new THREE.Object3D()
let n2 = new THREE.Object3D()
scene.add(n2)
n2.add(n1)
n2.rotation.x = .5

new THREE.Mesh(
	new THREE.SphereGeometry(1, 20, 20),
	new THREE.MeshBasicMaterial({ color:'#fc0' }),
).setPosition(3, 0, 0).addTo(n1)

new THREE.Mesh(
	new THREE.SphereGeometry(1, 20, 20),
	new THREE.MeshBasicMaterial({ color:'#4df' }),
).setPosition(-3, 0, 0).addTo(n1)

app.on('update', () => {

	n1.rotation.y += .01

})
