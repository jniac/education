
{(async () => {

	let thenFile = document.currentScript.getAttribute('then')

	let loadScript = (file) => new Promise((resolve) => {

		let tag = document.createElement('script')
		tag.setAttribute('src', file)
		tag.setAttribute('async', false)
		tag.setAttribute('defer', false)
		tag.onload = resolve
		document.head.append(tag)

	})

	let loadStyle = (file) => new Promise((resolve) => {

		let tag = document.createElement('link')
		tag.setAttribute('rel', 'stylesheet')
		tag.setAttribute('href', 'scripts/main.css')
		tag.onload = resolve
		document.head.append(tag)
	})

	let loadScripts = async (...files) => {

		for (let file of files)
			await loadScript(file)

	}

	await loadStyle('main.css')

	await loadScripts(
		'scripts/TweenMax.min.js',
		'scripts/inflate.min.js',
		'scripts/three.js',
		'scripts/OrbitControls.js',
		'scripts/FBXLoader.js',
		'scripts/extend-three.js',
		'scripts/events.js',
		'scripts/base.js',
	)

	let thenTag = document.createElement('script')
	let thenScript = await app.loadFile(thenFile)

	if (thenScript.match(/\bawait\b/)) {

		console.log('async code detected!')

		let variables = thenScript
			.split('\n')
			.map(line => line.match(/^(let|var|const) \w+/g))
			.reduce((acc, arr) => arr ? [...acc, ...arr] : acc, [])
			.map(s => s.split(' ')[1])

		let assignment = `Object.assign(window, { ${variables.join(', ')} })`

		thenTag.textContent = `(async () => {\n${thenScript}\n${assignment}\n})()`

	} else {

		thenTag.setAttribute('src', thenFile)
		thenTag.setAttribute('async', false)
		thenTag.setAttribute('defer', false)

	}

	document.head.append(thenTag)

})()}
