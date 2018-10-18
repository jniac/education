
let canvas = document.querySelector('canvas')

canvas.width = window.innerWidth
canvas.height = window.innerHeight

paper.setup(canvas)


let path = new paper.Path()
path.strokeColor = 'black'
path.moveTo(100, 100)
path.lineTo(200, 150)

paper.view.draw()
