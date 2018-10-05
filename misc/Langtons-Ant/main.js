
console.log("hello!")

let canvas = document.querySelector('canvas')
let ctx = canvas.getContext('2d')



let getPixelColor = (x, y) => {

    let [r, g, b, a] = ctx.getImageData(x, y, 1, 1).data

    let rgb = (r << 16) + (g << 8) + b
    let hex = rgb.toString(16).padStart(6, '0')

    return { r, g, b, a, rgb, hex }

}


// ctx.fillStyle = 'red'
// ctx.fillRect(10, 10, 1, 1)
// ctx.fillRect(20, 20, 5, 5)
// ctx.fillStyle = '#00000000'
// ctx.clearRect(21, 21, 1, 1)




// { : Alt + (
// [ : Alt + Shift + (

let orientations = ['N', 'E', 'S', 'W']

let ant = {
    x: 150,
    y: 150,
    orientation: 'N',
}

let turn = (toRight) => {

    let index = orientations.indexOf(ant.orientation)

    if (toRight) {

        index += 1

        if (index >= orientations.length) {

            index = 0

        }

    } else {

        index += -1

        if (index < 0) {

            index = orientations.length - 1

        }

    }

    ant.orientation = orientations[index]

}

let move = () => {

    let color = getPixelColor(ant.x, ant.y)

    if (color.a === 0x00) {

        ctx.fillStyle = '#ff0000'
        ctx.fillRect(ant.x, ant.y, 1, 1)

        turn(true)

    } else {

        ctx.clearRect(ant.x, ant.y, 1, 1)

        turn(false)

    }

    if (ant.orientation === 'N') {

        ant.y += -1

    } else if (ant.orientation === 'E') {

        ant.x += 1

    } else if (ant.orientation === 'S') {

        ant.y += 1

    } else if (ant.orientation === 'W') {

        ant.x += -1

    }

}





let antShouldMove = false

let loop = () => {

    if (antShouldMove) {

        move()
        move()
        move()
        move()
        move()
        move()

    }

}

setInterval(loop, 1000 / 60)

document.onkeydown = (event) => {

    if (event.code === 'Space') {

        antShouldMove = !antShouldMove

    }

}
