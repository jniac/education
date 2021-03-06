
let scroll = 0, scrollOld = 0

let scrollInside = (min, max) => scroll >= min && scroll <= max
let scrollOutside = (min, max) => scroll < min || scroll > max
let scrollOldInside = (min, max) => scrollOld >= min && scrollOld <= max
let scrollOldOutside = (min, max) => scrollOld < min || scrollOld > max
let scrollEnter = (min, max) => scrollInside(min, max) && scrollOldOutside(min, max)
let scrollExit = (min, max) => scrollOutside(min, max) && scrollOldInside(min, max)

let splitToSpan = (element) => {

	let text = element.innerHTML
	let spans = [...text].map(char => `<span>${char}</span>`)
	element.innerHTML = spans.join('')

}

let update = () => {

	scrollOld = scroll
	scroll = (
		document.querySelector('html').scrollTop ||
		document.querySelector('body').scrollTop
	) / window.innerHeight

	document.querySelector('header div.scroll span').innerHTML = scroll.toFixed(2)

	updateHeader()
	updateSection1()
	updateSection2()
	updateSection3()
	updateSection4()

}

let initHeader = () => {

	let date = new Date()

	let week = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi']
	let day = week[date.getDay()]

	let months = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre']
	let month = months[date.getMonth()]

	document.querySelector('header div.info').innerHTML =
		`${day} ${date.getDate()} ${month}`

}

initHeader()

let updateHeader = () => {

	if (scrollInside(3, 4)) {

		document.querySelector('header').className = 's4'

	} else if (scrollInside(2, 3)) {

		document.querySelector('header').className = 's3'

	} else if (scrollInside(1, 2)) {

		document.querySelector('header').className = 's2'

	} else {

		document.querySelector('header').className = 's1'

	}

}

let updateSection2 = () => {

	if (scrollEnter(0.6, 1.4)) {

		TweenMax.fromTo('section#s2 h1', 1,
			{ scale:0.2, opacity:0 },
			{ scale:1.0, opacity:1, ease: Elastic.easeOut.config(1, 0.3) })

	}

	if (scrollExit(0.6, 1.4)) {

		TweenMax.to('section#s2 h1', 0.25,
			{ scale:0.95, opacity:0 })

	}

}

let updateSection3 = () => {

	if (scrollEnter(1.8, 2.2)) {

		document.querySelector('section#s3 video').play()
		TweenMax.to('section#s3 h1', 0.5, { opacity:0 })

	}

	if (scrollExit(1.8, 2.2)) {

		document.querySelector('section#s3 video').pause()
		TweenMax.to('section#s3 h1', 0.5, { opacity:1 })

	}

}

let updateSection4 = () => {

	if (scrollEnter(3, 4)) {

		section4AnimIn()

	}
	if (scrollExit(3 - .25, 4 + .25)) {

		section4AnimOut()

	}

}










for(let p of document.querySelectorAll('section#s4 h1 p')) {

    splitToSpan(p)

}

let section4AnimIn = async () => {

	let spanAnim = async (span) => {

		span.className = 'line'
		await kit.wait(.1)
		span.className = 'plain'
		await kit.wait(.1)
		span.className = kit.Random.float() < .85 ? 'normal' : 'color'

	}

	let spans = [...document.querySelectorAll('section#s4 h1 span')]

	kit.Random.shuffle(spans)

	for (let span of spans) {

		await kit.wait(.03)
		spanAnim(span)

	}

}

let section4AnimOut = async () => {

	let spans = [...document.querySelectorAll('section#s4 h1 span')]

	for (let span of spans) {

		span.className = ''

	}

}










// SECTION 1 ANIM
// compliqué...

kit.SVG.viewBoxFitWidth('section#s1 svg', 1920, 1080, .5)

for (let p of document.querySelectorAll('section#s1 h1 p')) {

    splitToSpan(p)

}

let section1Spans = document.querySelectorAll('section#s1 h1 span')

for (let span of section1Spans) {

	span.setAttribute('speed', kit.Random.float(1, 4).toFixed(3))

}

let updateSection1 = () => {

	TweenMax.set('section#s1 svg circle#c1', { y:-1000 * scroll })
	TweenMax.set('section#s1 svg circle#c2', { y:-3400 * scroll })
	TweenMax.set('section#s1 svg circle#c3', { y:-1800 * scroll })
	TweenMax.set('section#s1 svg circle#c4', { y:-1500 * scroll })
	TweenMax.set('section#s1 svg rect#r1', { y:-5000 * scroll, rotation:720 * 3 * scroll, transformOrigin:'center' })

	for(let span of section1Spans) {

		let speed = span.getAttribute('speed')
		span.style.color = kit.Color.mix('black', 'blue', speed * scroll * 2)
		span.style.transform = `translateY(${(-speed * 200 * scroll).toFixed(1)}px)`

	}

}









document.querySelector('body').onscroll = update
update()
