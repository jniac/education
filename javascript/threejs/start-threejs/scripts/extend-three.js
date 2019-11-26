
{(() => {

	const { DEG2RAD } = THREE.Math

	Object.assign(THREE.Object3D.prototype, {

		set({ parent, rotation, ...props }) {

			if (parent)
				this.addTo(parent)

			if (rotation)
				this.setRotation(rotation)

			Object.assign(this, props)

			return this

		},

		setPosition(x, y, z) {

			this.position.set(x, y, z)

			return this

		},

		setRotation({ x = 0, y = 0, z = 0, degree = true }) {

			if (degree) {
				x *= THREE.Math.DEG2RAD
				y *= THREE.Math.DEG2RAD
				z *= THREE.Math.DEG2RAD
			}

			this.rotation.set(x, y, z)

			return this

		},

		addTo(parent) {

			parent.add(this)

			return this

		},

		setRotation({ x = 0, y = 0, z = 0, degree = true, incremental = false }) {

			if (degree) {

				x *= DEG2RAD
				y *= DEG2RAD
				z *= DEG2RAD

			}

			if (incremental) {

				x += this.rotation.x
				y += this.rotation.y
				z += this.rotation.z

			}

			this.rotation.set(x, y, z)

			return this

		},

		query(selector, returnFirst = false) {

			if (typeof selector === 'string') {

				if (selector.startsWith('f:'))
					[returnFirst, selector] = [true, selector.slice(2)]

				selector = new RegExp(`^${selector}\$`)

			}

			if (returnFirst)
				return this.query(selector)[0]

			let result = []

			for (let child of this.children) {

				if (selector.test(child.name))
					result.push(child)

				result.push(...child.query(selector))

			}

			return result

		},

	})

})()}
