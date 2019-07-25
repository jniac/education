
let plane = new THREE.Mesh(
	new THREE.PlaneGeometry(4, 4),
	new THREE.MeshBasicMaterial({ map:app.loadTexture('assets/dots.png' )})
)
scene.add(plane)

let verso = new THREE.Mesh(
	new THREE.PlaneGeometry(4, 4),
	new THREE.MeshBasicMaterial({ map:app.loadTexture('assets/troll-face.png' )})
)
verso.rotation.y = Math.PI
plane.add(verso)

plane.on('pointer-click', () => {

	// plane.rotation.y = Math.PI
	TweenMax.to(plane.rotation, 1, { y:Math.PI })

})
