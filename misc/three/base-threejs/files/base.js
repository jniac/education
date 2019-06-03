


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

let app = (() => {

	let raycaster = new THREE.Raycaster()

	let textureLoader = new THREE.TextureLoader()

	// event propagation callback (bubbling)
	let propagate = object => object.parent

	let firePointerEvent = (target, eventType, eventProps = null) => {

		events.fire(target, eventType, { ...eventProps, propagate })
		events.fire(pointer, eventType, { pointerTarget:target, ...eventProps })

	}

	let autoSleepDelay = 10000

	let resizeCounter = 0
	window.addEventListener('resize', () => resizeCounter = 2)
	let resize = () => {

		let { innerWidth:w, innerHeight:h } = window
		camera.aspect = w / h
		camera.updateProjectionMatrix()
		renderer.setSize(w, h)

	}

	let animate = () => {

		requestAnimationFrame(animate)

		if (resizeCounter-- === 0)
			resize()

		if (Date.now() - pointer.lastEventTimestamp > autoSleepDelay)
			return

		updatePointer()

		renderer.render(scene, camera)

	}

	renderer.domElement.addEventListener('mousemove', (event) => {

		pointer.position.x = (event.clientX / window.innerWidth) * 2 - 1
		pointer.position.y = -(event.clientY / window.innerHeight) * 2 + 1

		pointer.lastEventTimestamp = Date.now()

		raycaster.setFromCamera(pointer.position, camera)

	})

	renderer.domElement.addEventListener('mousedown', (event) => {

		let target = pointer.over.target || scene
		let timestamp = Date.now()

		pointer.lastEventTimestamp = timestamp
		Object.assign(pointer.down, { target, timestamp })
		firePointerEvent(target, 'pointer-down', { timestamp })

	})

	renderer.domElement.addEventListener('mouseup', (event) => {

		let target = pointer.over.target || scene
		let timestamp = Date.now()

		pointer.lastEventTimestamp = timestamp
		Object.assign(pointer.up, { target, timestamp })
		firePointerEvent(target, 'pointer-up', { timestamp })

		let duration = timestamp - pointer.down.timestamp

		if (target == pointer.down.target && duration < 400) {

			firePointerEvent(target, 'pointer-click', { timestamp, duration })

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

		return intersections

	}

	let getPointerTarget = () => getPointerIntersections().sort((A, B) => A.distance - B.distance).map(v => v.object)[0]

	Object.assign(pointer, { getPointerIntersections, getPointerTarget, raycaster })

	let updatePointer = () => {

		let newPointerOverTarget = getPointerTarget()

		if (newPointerOverTarget != pointer.over.target) {

			let timestamp = Date.now()

			if (pointer.over.target)
				firePointerEvent(pointer.over.target, 'pointer-out', { timestamp })

			pointer.over.target = newPointerOverTarget

			if (pointer.over.target)
				firePointerEvent(pointer.over.target, 'pointer-over', { timestamp })

		}

	}

	animate()

	return {

		pointer,
		renderer,
		camera,
		scene,

		textureLoader,

		get autoSleepDelay() { return autoSleepDelay },
		set autoSleepDelay(value) { autoSleepDelay = value },

		loadTexture(url) { return textureLoader.load(url) },

	}

})()
