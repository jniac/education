
class Vertigo extends THREE.Object3D {

	constructor(perspective = 1, aspect = 1) {

		super()

		// allow a much more natural manipulation
		this.rotation.order = 'YXZ'

		const toRad = Math.PI / 180

		let width = 12
		let fovRef = 45
		let fov = fovRef

		let perspectiveCamera = new THREE.PerspectiveCamera(fov, aspect)
		let orthographicCamera = new THREE.OrthographicCamera(-width / 2, width / 2, -width / aspect / 2, width / aspect / 2)

		this.add(orthographicCamera)
		this.add(perspectiveCamera)

		let isOrthographic = fov < 1e-4

		const compute = () => {

			let height = width / aspect

			if (isOrthographic = fov < 1e-4) {

				let w = width / 2
				let h = height / 2
				orthographicCamera.left = -w
				orthographicCamera.right = w
				orthographicCamera.bottom = -h
				orthographicCamera.top = h
				orthographicCamera.position.set(0, 0, width)
				orthographicCamera.updateProjectionMatrix()

			} else {

				let d = (height / 2) / Math.tan(fov * toRad / 2)
				perspectiveCamera.fov = fov
				perspectiveCamera.aspect = aspect
				perspectiveCamera.position.set(0, 0, d)
				perspectiveCamera.updateProjectionMatrix()

			}

		}

		const setPerspective = (value) => {

			perspective = value
			fov = fovRef * perspective

			compute()

		}

		setPerspective(perspective)

		Object.defineProperties(this, {

			perspective: {
				get: () => perspective,
				set: setPerspective,
			},

			width: {
				get: () => width,
				set: value => {
					width = value
					compute()
				}
			},

			height: {
				get: () => width / aspect,
				set: value => {
					width = value * aspect
					compute()
				}
			},

			aspect: {
				get: () => aspect,
				set: value => {
					aspect = value
					compute()
				}
			},

			isOrthographic: {
				get:() => isOrthographic,
			},

			camera: {
				get: () => isOrthographic ? orthographicCamera : perspectiveCamera
			}

		})

		Object.assign(this, {

			orthographicCamera,
			perspectiveCamera,

		})
	}

}
