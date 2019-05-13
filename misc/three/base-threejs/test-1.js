
// pointer.on('pointer-over', ({ pointerTarget }) => pointerTarget.scale.multiplyScalar(1.2))
// pointer.on('pointer-out', ({ pointerTarget }) => pointerTarget.scale.divideScalar(1.2))

let cube = new THREE.Mesh(
	new THREE.BoxGeometry(1, 1, 1),
	new THREE.MeshBasicMaterial({ color:0x00ff00 }),
)
	.setRotation({ x:25, y:70 }).set({ name:'cube' })
	.on('pointer-over', function() { this.scale.multiplyScalar(1.2) })
	.on('pointer-out', function() { this.scale.divideScalar(1.2) })

let insideCube = new THREE.Mesh(
	new THREE.BoxGeometry(2, 2, .1),
	new THREE.MeshBasicMaterial({ color:'red' }),
)
	.addTo(cube).set({ name:'insideCube' })
	// .on(/pointer-(over|out)/, event => event.cancel())

cube.onBeforeRender = function() {

	this.rotation.x += 0.001
	this.rotation.y += 0.001

}
