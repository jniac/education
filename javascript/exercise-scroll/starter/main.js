let scroll = 0
let scroll_old = 0

let update = () => {

	scroll_old = scroll
	scroll = document.querySelector('html').scrollTop
	scroll /= window.innerHeight

	document.querySelector('header div.scroll span').innerHTML =
		scroll.toFixed(2)

	document.querySelector('body').style.backgroundColor =
		kit.Color.mix('rgb(94, 33, 206)', 'wheat', scroll)

	// updateHeader()
}

document.body.onscroll = update

update()


let updateHeader = () => {

	// arrière-plan header, solution 1 (classique if... else...):
	if (scroll < 0.2) {
		document.querySelector('header').style.backgroundColor = '#000d'
	} else {
		document.querySelector('header').style.backgroundColor = '#0000'
	}

	// arrière-plan header, solution 2 (...? ... : ...):
	document.querySelector('header').style.backgroundColor =
		scroll < 0.2 ? '#000d' : '#0000'

}
