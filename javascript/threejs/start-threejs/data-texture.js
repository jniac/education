
// https://github.com/jniac/js-kit
// https://jniac.github.io/js-kit/test/random/
let random = new kit.Random()

let { scene } = app

const makeRandomCube = () => {

    let width = 3, height = 3
    let size = width * height
    let data = new Uint8Array(4 * size)

    for (let i = 0; i < size; i ++) {

    	let stride = i * 4
    	let x = i % width

    	data[stride] = 0xff
    	data[stride + 1] = random.int(0x33, 0xff)
    	data[stride + 2] = random.int(0x99, 0xff)
    	data[stride + 3] = 0xff * (x + 1) / width

    }

    let texture = new THREE.DataTexture(data, width, height, THREE.RGBAFormat)
    texture.needsUpdate = true

    return new THREE.Mesh(
    	new THREE.BoxGeometry(2, 2, 2),
    	new THREE.MeshBasicMaterial({
    		transparent: true,
    		map: texture,
    		side: THREE.DoubleSide,
    	}),
    )

}

const makeBase64Cube = () => {

    function base64ToArrayBuffer(base64) {
        var binary_string = window.atob(base64);
        var len = binary_string.length;
        var bytes = new Uint8Array(len);
        for (var i = 0; i < len; i++) {
            bytes[i] = binary_string.charCodeAt(i);
        }
        return bytes.buffer;
    }

    let data = 'iVBORw0KGgoAAAANSUhEUgAAAAkAAAAJCAYAAADgkQYQAAAAS0lEQVQoFWO4v/72fxhmwAVgCkD0jH8HMTBYHyFFV2xu/gcrxGYCTAyrojcqhv9BmChFk433/IdhrNbBJGE08YpAKkEOhGGYCTAaAAsjzL5FpUdbAAAAAElFTkSuQmCC'
    let texture = new THREE.TextureLoader().load(`data:image/png;base64,${data}`)
    texture.minFilter = THREE.NearestFilter
    texture.magFilter = THREE.NearestFilter

    return new THREE.Mesh(
    	new THREE.BoxGeometry(2, 2, 2),
    	new THREE.MeshBasicMaterial({
    		transparent: true,
    		map: texture,
    		side: THREE.DoubleSide,
    	}),
    )

}






let paused = false

function rotate() {

    if (paused) return

	this.rotation.x += 0.01
	this.rotation.y += 0.01

}


let randomCube = makeRandomCube()
randomCube.position.x = -1.5
randomCube.onBeforeRender = rotate
scene.add(randomCube)

let base64Cube = makeBase64Cube()
base64Cube.position.x = 1.5
base64Cube.onBeforeRender = rotate
scene.add(base64Cube)

window.addEventListener('keydown', event => {

    if (event.code === 'Space')
        paused = !paused

})
