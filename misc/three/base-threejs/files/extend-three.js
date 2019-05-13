
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

	})

})()}
