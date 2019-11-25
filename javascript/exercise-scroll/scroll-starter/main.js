
let scroll = 0
let scrollOld = 0

let scrollInside = (min, max) => scroll >= min && scroll <= max
let scrollOutside = (min, max) => scroll < min || scroll > max
let scrollOldInside = (min, max) => scrollOld >= min && scrollOld <= max
let scrollOldOutside = (min, max) => scrollOld < min || scrollOld > max
let scrollEnter = (min, max) => scrollInside(min, max) && scrollOldOutside(min, max)
let scrollExit = (min, max) => scrollOutside(min, max) && scrollOldInside(min, max)

let update = () => {

	scrollOld = scroll
	scroll = document.querySelector('html').scrollTop
	scroll /= window.innerHeight

	document.querySelector('header div.scroll span').innerHTML =
		scroll.toFixed(2)

	document.querySelector('body').style.backgroundColor =
		kit.Color.mixArray(['#5621ce', '#7adbe6', '#82ffc1', '#fff672'], scroll)

	updateHeader()
	updateSection1()
}

let updateHeader = () => {

	if (scrollInside(0, 0.3)) {

		document.querySelector('header').style.backgroundColor = 'black'

	} else {

		document.querySelector('header').style.backgroundColor = 'transparent'

	}

	if (scroll > 2) {

		document.querySelector('header').style.color = 'black'

	} else {

		document.querySelector('header').style.color = 'white'

	}

}

let updateSection1 = () => {

	if (scrollEnter(.75, 1.25)) {

		TweenMax.to('polygon#cross', 1.2, { rotation:'+=90', transformOrigin:'center', ease:Power4.easeOut })
		TweenMax.to('rect#blue', 1.4, { rotation:'+=90', transformOrigin:'center', ease:Power4.easeOut })
		TweenMax.to('rect#black', 1.6, { rotation:'+=90', transformOrigin:'center', ease:Power4.easeOut })

	}

}

document.body.onscroll = update

update()

kit.SVG.viewBoxFitWidth('section svg', 1920, 1080, 1)
