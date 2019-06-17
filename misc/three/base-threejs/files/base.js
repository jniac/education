


events.makeDispatcher(THREE.Object3D.prototype)

let scene = new THREE.Scene()
let camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000)

let renderer = new THREE.WebGLRenderer({ antialias:true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setClearColor('#eee')
document.body.appendChild(renderer.domElement)

camera.position.z = 5



let pointer = events.makeDispatcher({

	lastEventTimestamp: Date.now(),
	position: new THREE.Vector2(),
	over: { target:null, timestamp:-1 },
	down: { target:null, timestamp:-1 },
	up: { target:null, timestamp:-1 },

})

// https://gist.github.com/blixt/f17b47c62508be59987b
class PRNG {
	constructor(seed = 12345) {

		Object.defineProperty(this, 'seed', {
			enumerable: true,
			get() { return seed },
			set(value) {
				seed = Math.floor(value % 2147483647)

				if (seed <= 0)
					seed += 2147483646

				this.pos = seed
			},
		})

		this.reset(seed)
	}
	reset() {
		this.seed = this.seed
		return this
	}
	randomSeed() {
		this.seed = (2147483647 * Math.random())
		return this
	}
	next() {
		return this.pos = this.pos * 16807 % 2147483647
	}
	nextFloat() {
		return (this.next() - 1) / 2147483646
	}
	among(array) {
		return array[Math.floor(array.length * this.nextFloat())]
	}
	random() {
		if (arguments.length == 1 && (typeof arguments[0] === 'number'))
			return this.nextFloat() * arguments[0]

		if (arguments.length == 1 && (arguments[0] instanceof Array)) {
			if (arguments[0][0] && typeof arguments[0][0] == 'object' &&('weight' in arguments[0][0]))
				return this.weighted(arguments[0])

			return this.among(arguments[0])
		}

		let [min = 0, max = 1] = arguments
		return min + (max - min) * this.nextFloat()
	}
	weighted(array) {
		let total = array.reduce((s, item) => s += item.weight, 0)
		let r = total * this.nextFloat()
		let i = 0
		let s = array[i].weight
		while (s < r)
			s += array[++i].weight
		return array[i]
	}
}

let app = (() => {

	let raycaster = new THREE.Raycaster()

	let textureLoader = new THREE.TextureLoader()
	let xhr = new XMLHttpRequest()

	// event propagation callback (bubbling)
	let propagate = object => object.parent

	let firePointerEvent = (target, eventType, eventProps = null) => {

		events.fire(target, eventType, { ...eventProps, propagate })
		events.fire(pointer, eventType, { pointerTarget:target, ...eventProps })

	}

	let autoSleepDelay = 30000

	let resizeCounter = 0
	window.addEventListener('resize', () => resizeCounter = 2)
	let resize = () => {

		let { innerWidth:w, innerHeight:h } = window
		camera.aspect = w / h
		camera.updateProjectionMatrix()
		renderer.setSize(w, h)

	}

	renderer.domElement.addEventListener('mousemove', (event) => {

		pointer.position.x = (event.clientX / window.innerWidth) * 2 - 1
		pointer.position.y = -(event.clientY / window.innerHeight) * 2 + 1

		raycaster.setFromCamera(pointer.position, camera)

	})

	window.addEventListener('mousemove', () => pointer.lastEventTimestamp = Date.now())

	renderer.domElement.addEventListener('mousedown', (event) => {

		let target = pointer.over.target || scene
		let timestamp = Date.now()
		let { shiftKey:shift, altKey:alt, ctrlKey:ctrl, metaKey:meta } = event

		pointer.lastEventTimestamp = timestamp
		Object.assign(pointer.down, { target, timestamp, keys:{ shift, alt, ctrl, meta } })
		firePointerEvent(target, 'pointer-down', { timestamp })

	})

	renderer.domElement.addEventListener('mouseup', (event) => {

		let target = pointer.over.target || scene
		let timestamp = Date.now()
		let { shiftKey:shift, altKey:alt, ctrlKey:ctrl, metaKey:meta } = event

		pointer.lastEventTimestamp = timestamp
		Object.assign(pointer.up, { target, timestamp })
		firePointerEvent(target, 'pointer-up', { timestamp, keys:{ shift, alt, ctrl, meta } })

		let duration = timestamp - pointer.down.timestamp

		if (target == pointer.down.target && duration < 400) {

			firePointerEvent(target, 'pointer-click', { timestamp, duration, keys:pointer.down.keys })

		}

	})

	Object.assign(THREE.Object3D.prototype, {

		interactive: true,
		interactiveSelf: true,
		interactiveChildren: true,

	})

	let getPointerIntersections = (children = scene.children, intersections = []) => {

		for (let child of children) {

			if (child.interactive === false)
				continue

			if (child.interactiveChildren !== false &&
				child.children &&
				child.children.length > 0)
				getPointerIntersections(child.children, intersections)

			if (child.interactiveSelf === false)
				continue

			let [intersection] = raycaster.intersectObject(child, false)

			if (intersection)
				intersections.push(intersection)

		}

		return intersections.sort((A, B) => A.distance - B.distance)

	}

	let getPointerTarget = () => getPointerIntersections().map(v => v.object)[0]

	Object.assign(pointer, { getPointerIntersections, getPointerTarget, raycaster })

	let updatePointer = () => {

		let [intersection] = getPointerIntersections()

		Object.assign(pointer, { intersection })

		let newPointerOverTarget = intersection && intersection.object

		if (newPointerOverTarget != pointer.over.target) {

			let timestamp = Date.now()

			if (pointer.over.target)
				firePointerEvent(pointer.over.target, 'pointer-out', { timestamp })

			pointer.over.target = newPointerOverTarget

			if (pointer.over.target)
				firePointerEvent(pointer.over.target, 'pointer-over', { timestamp })

		}

	}



	// PRNG
	let prng = new PRNG()


	// Particles:
	let particles = []
	let particlesToInit = new Set()
	let particleCubeGeometry = new THREE.CubeGeometry(.1, .1, .1)

	class Particle extends THREE.Object3D {

		constructor(geometry = null, material = null) {

			super()

			particles.push(this)

			if (!geometry)
				geometry = particleCubeGeometry

			if (!material)
				material = new THREE.MeshBasicMaterial({ color:'red' })

			this.add(new THREE.Mesh(geometry, material))

			Object.assign(this, {
				t: 0,
				velocity: new THREE.Vector3(0, 0, 0),
				rotationVelocity: new THREE.Vector3(0, 0, 0),
			})

			particlesToInit.add(this)

		}

		kill() {

			if (this.killed)
				return

			let index = particles.indexOf(this)
			particles.splice(index, 1)
			scene.remove(this)
			this.killed = true

		}

	}

	Object.assign(Particle.prototype, {

		killed: false,
		tMax: 3,
		friction: 0,

	})

	Object.defineProperties(Particle.prototype, {

		tProgress: {
			get() { return this.t / this.tMax },
			set(value) { this.t = value * this.tMax },
		}

	})

	let updateParticles = () => {

		for (let particle of particlesToInit) {

			if (particle.update && typeof particle.update === 'function')
				particle.update(0)

		}



		let dt = 1 / 60

		for (let particle of particles) {

			let f = (1 - particle.friction) ** dt

			particle.t += dt

			if (particle.t > particle.tMax) {

				particle.kill()
				continue

			}

			particle.velocity.x *= f
			particle.velocity.y *= f
			particle.velocity.z *= f

			particle.position.x += particle.velocity.x * dt
			particle.position.y += particle.velocity.y * dt
			particle.position.z += particle.velocity.z * dt

			particle.rotation.x += particle.rotationVelocity.x * dt
			particle.rotation.y += particle.rotationVelocity.y * dt
			particle.rotation.z += particle.rotationVelocity.z * dt

			if (particle.update && typeof particle.update === 'function')
				particle.update(dt)

			if (Math.abs(particle.scale.x) < 1e-12)
				particle.scale.x = 1e-12
			if (Math.abs(particle.scale.y) < 1e-12)
				particle.scale.y = 1e-12
			if (Math.abs(particle.scale.z) < 1e-12)
				particle.scale.z = 1e-12

		}

		for (let particle of particlesToInit)
			scene.add(particle)

		particlesToInit.clear()

	}



	let wait = delay => new Promise(resolve => setTimeout(resolve, delay * 1000))

	let mixColors = (colorA, colorB, t) => {

		if (typeof colorA === 'string')
			colorA = new THREE.Color(colorA)

		if (typeof colorB === 'string')
			colorB = new THREE.Color(colorB)

		let r = colorA.r * (1 - t) + colorB.r * t
		let g = colorA.g * (1 - t) + colorB.g * t
		let b = colorA.b * (1 - t) + colorB.b * t
		let a = colorA.a * (1 - t) + colorB.a * t

		return new THREE.Color(r, g, b, a)

	}

	let time = 0
	let frame = 0

	let app = events.makeDispatcher({

		version: '1.0.6',

		pointer,
		renderer,
		camera,
		scene,

		Particle,
		particles,

		PRNG,
		prng,
		random: (...args) => prng.random(...args),
		mixColors,

		textureLoader,
		wait,

		get time() { return time },
		get frame() { return frame },

		get autoSleepDelay() { return autoSleepDelay },
		set autoSleepDelay(value) { autoSleepDelay = value },

		loadTexture(url) { return textureLoader.load(url) },
		loadFile: url => new Promise(resolve => {

			xhr.open('GET', url)
			xhr.send(null)
			xhr.onload = () => resolve(xhr.responseText)

		}),
	})

	let sleep_old
	let animate = (timestamp) => {

		requestAnimationFrame(animate)

		if (resizeCounter-- === 0)
			resize()

		let sleep = Date.now() - pointer.lastEventTimestamp > autoSleepDelay

		if (sleep && !sleep_old)
			renderer.domElement.style.opacity = '.5'

		if (!sleep && sleep_old)
			renderer.domElement.style.opacity = null

		sleep_old = sleep

		if (sleep)
			return

		updateParticles()
		updatePointer()

		app.fire('update')

		renderer.render(scene, camera)

		time += 1/60
		frame++

	}

	animate()

	return app

})()
