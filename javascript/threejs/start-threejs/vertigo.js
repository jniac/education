
const toRad = Math.PI / 180

class Vertigo extends THREE.Object3D {

    constructor(perspective = 1, aspect = 1) {

        super()

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

let { scene } = app

let aspect = window.innerWidth / window.innerHeight

let vertigo = new Vertigo(1, aspect)
scene.add(vertigo)

document.querySelector('input[name=perspective]').oninput = (e) => {

    vertigo.perspective = parseFloat(e.target.value)
    document.querySelector('label[for=perspective]').innerHTML = `perspective (${vertigo.perspective.toFixed(2)})`

}

document.querySelector('input[name=width]').oninput = (e) => {

    vertigo.width = parseFloat(e.target.value)
    updateLabels()

}

document.querySelector('input[name=height]').oninput = (e) => {

    vertigo.height = parseFloat(e.target.value)
    updateLabels()

}

const updateLabels = () => {

    document.querySelector('input[name=width]').value = vertigo.width
    document.querySelector('label[for=width]').innerHTML = `width (${vertigo.width.toFixed(1)})`
    document.querySelector('input[name=height]').value = vertigo.height
    document.querySelector('label[for=height]').innerHTML = `height (${vertigo.height.toFixed(1)})`

}
updateLabels()

app.render = () => app.renderer.render(scene, vertigo.camera)







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
