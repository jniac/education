
let canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
paper.setup(canvas)

window.addEventListener('resize', () => {

    const { innerWidth:width, innerHeight:height } = window
    canvas.width = width
    canvas.height = height
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    view.setViewSize(width, height)
    view.fire('resize')
})

const { view, Path, Point, Color } = paper



// application:

// kit.Random remplace l'usage de Math.random()
// avantage de kit.Random : simplifie l'usage de tirage aléatoire.
// https://jniac.github.io/js-kit/test/random/
const R = new kit.Random(123456)

const makeAShape = (color, step = 9, radius = 200) => {

    const path = new paper.Path({ closed:true })
    path.shadowColor = new Color(color)
    path.shadowColor.brightness *= .75
    path.shadowColor.alpha = .25
    path.shadowBlur = 12
    path.fillColor = color

    for (let i = 0; i < step; i++) {

        // dessin :
        let r = radius * R.float(1, 1.5)
        let a = 2 * Math.PI * i / step
        let x = view.center.x + r * Math.cos(a)
        let y = view.center.y + r * Math.sin(a)

        let point = new Point(x, y)
        path.add(point)

        view.on('resize', () => {
            x = view.center.x + r * Math.cos(a)
            y = view.center.y + r * Math.sin(a)
        })

        // animation :
        let offset = R.float(0, 10)
        let speed = R.float(1, 2) * .2

        view.on('frame', event => {
            let t = offset + event.time * speed
            path.segments[i].point.x = x + 20 * Math.cos(t)
            path.segments[i].point.y = y + 20 * Math.sin(t)
        })
    }

    view.on('frame', () => path.smooth({ type:'continuous' }))
}

makeAShape('#fff', 10, 500)
makeAShape('#5146E6', 10, 250)
makeAShape('#F1E046', 7, 220)
