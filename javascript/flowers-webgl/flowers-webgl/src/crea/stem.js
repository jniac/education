import THREE from '../THREE.js'
import { scene } from '../setup.js'

const curve = new THREE.CubicBezierCurve3(
	new THREE.Vector3(-2, -5, 0),
	new THREE.Vector3(-2, -3, 0),
	new THREE.Vector3(0, -2, 0),
	new THREE.Vector3(0, 0, 0),
)

// const points = curve.getPoints(50)
// const geometry = new THREE.BufferGeometry().setFromPoints(points)

const geometry = new THREE.TubeGeometry(curve, 20, 0.05, 8, false)

// const material = new THREE.LineBasicMaterial({ color : 0xff0000 })
const material = new THREE.MeshBasicMaterial({ 
	color: '#5886F2',
	side: THREE.DoubleSide,
})

// Create the final object to add to the scene
const curveObject = new THREE.Mesh(geometry, material)
scene.add(curveObject)
