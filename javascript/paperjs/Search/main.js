
let canvas = document.querySelector('canvas')
canvas.width = window.innerWidth
canvas.height = window.innerHeight
paper.setup(canvas)


//
const { view, Path, Point, Color } = paper



// application:

// kit.Random remplace l'usage de Math.random()
// avantage de kit.Random :
// - simplifie l'usage de tirage nombre aléatoire.
// - est basé sur une 'graine' (seed)
// https://jniac.github.io/js-kit/test/random/
const R = new kit.Random(123456)

let time = 0
let deltaTime = 1 / 60

view.on('frame', () => {

    time += deltaTime
    deltaTime += ((1 / 60) - deltaTime) / 10
})

document.querySelector('input').addEventListener('input', () => {
    deltaTime += 1
})

const makeAShape = (color, step = 9, radius = 200) => {

    const path = new Path({ closed:true })
    path.fillColor = color

    // légère, très légère ombre portée
    path.shadowColor = new Color(color)
    path.shadowColor.brightness *= .75
    path.shadowColor.alpha = .25
    path.shadowBlur = 12

    for (let i = 0; i < step; i++) {

        let point = new Point(0, 0)
        path.add(point)

        let r = radius * R.float(1, 1.5)
        let a = 2 * Math.PI * i / step
        let offset = R.float(0, 10)
        let speed = R.float(1, 2) * .2

        view.on('frame', () => {
            let x = view.center.x + r * Math.cos(a)
            let y = view.center.y + r * Math.sin(a)
            let t = offset + time * speed
            path.segments[i].point.x = x + 20 * Math.cos(t)
            path.segments[i].point.y = y + 20 * Math.sin(t)
        })
    }

    view.on('frame', () => {
        // http://paperjs.org/reference/pathitem/#smooth
        path.smooth({ type:'continuous' })
    })
}

makeAShape('#fff', 10, 500)
makeAShape('#5146E6', 10, 250)
makeAShape('#F1E046', 7, 220)






// gestion du redimensionnement de la fenêtre (resize)
window.addEventListener('resize', () => {

    const { innerWidth:width, innerHeight:height } = window
    canvas.width = width
    canvas.height = height
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    view.setViewSize(width, height)
    view.fire('resize')
})
