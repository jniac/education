
let { scene } = app

let cube = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color:0x00ff00 }),
)

scene.add(cube)

cube.onBeforeRender = function() {

	cube.rotation.x += 0.01
	cube.rotation.y += 0.01

}
