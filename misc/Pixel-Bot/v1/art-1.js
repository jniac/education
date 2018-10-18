
import Bot from './bots/Bot.js'

Bot.sampling = 10

class Line extends Bot {

	start(color = '#09f', threshold = .01, paintTest = () => true) {

        this.x = 150
        this.y = 150
        this.color = color
        this.threshold = threshold
        this.paintTest = paintTest

    }

	update() {

        if (this.paintTest(this.updateCount)) {

            this.setPixelColor(this.color)

            if (Math.random() > 1 - this.threshold) {

                this.turnLeft()

            }

        }

        this.move()

    }

}

class LangtonAnt extends Bot {

	start(x, y, color) {

        this.x = x
        this.y = y
        this.color = color

    }

	update() {

        if (this.pixelColor.r > .5) {

            this.turnLeft()
            this.setPixelColor(this.color)

        } else {

            this.turnRight()
            this.setPixelColor('#fc0')

        }

        this.move()

    }

}

class Painter extends Bot {

	start() {

        this.x = 200
        this.y = 200

        this.mode = 'roam'

        this.unitMax = 60
        this.lineMax = 30
        this.paintTest = () => Math.random() < .5
        this.roamTest = ({ updateCount }) => updateCount % 3 === 0

        this.unitCount = 0
        this.lineCount = 0
        this.color = '#f39'
        this.turnCount = 0

    }

	sequenceTurn() {

        let n = this.turnCount % 4

        this.turn(n === 0 || n === 3)

        this.turnCount++

    }

	paint() {

        if (this.paintTest(this)) {

            this.setPixelColor(this.color)

        }

        if (this.unitCount === 0) {

            this.sequenceTurn()

        }

        this.unitCount++

        if (this.unitCount === this.unitMax) {

            this.sequenceTurn()

            this.unitCount = 0
            this.lineCount++

        }

        if (this.lineCount === this.lineMax) {

            this.unitCount = 0
            this.lineCount = 0

            this.mode = 'roam'

        }

    }

    roam() {

        if (this.roamTest(this)) {

            this.setPixelColor(this.color)

        }

        if (Math.random() > .95) {

            this.turn(Math.random() > .5)

        }

        if (Math.random() > .999) {

            this.mode = 'paint'

        }

    }

	update() {

        if (this.mode === 'roam') {

            this.roam()

        } else if (this.mode === 'paint') {

            this.paint()

        }

        this.move()

    }

}

// Line

new Line().set({
	x: 29,
	y: 225,
	orientation: 'W',
	color: '#fc0',
	threshold: 0.01,
	paintTest: n => n % 3 < 2,
})

new Line().set({
	x: 78,
	y: 174,
	orientation: 'N',
	color: '#ffdda2',
	threshold: 0.1,
	paintTest: () => true,
})

// LangtonAnt

new LangtonAnt().set({
	x: 54,
	y: 60,
	orientation: 'W',
	color: '#09f',
})

new LangtonAnt().set({
	x: 238,
	y: 22,
	orientation: 'W',
	color: '#09f',
})

new LangtonAnt().set({
	x: 274,
	y: 86,
	orientation: 'W',
	color: '#096',
})

new LangtonAnt().set({
	x: 172,
	y: 274,
	orientation: 'E',
	color: '#03f',
})

new LangtonAnt().set({
	x: 262,
	y: 266,
	orientation: 'E',
	color: '#0ff',
})

new LangtonAnt().set({
	x: 130,
	y: 164,
	orientation: 'E',
	color: '#0ff',
})

new LangtonAnt().set({
	x: 130,
	y: 264,
	orientation: 'E',
	color: '#066',
})

// Painter

new Painter().set({
	x: 231,
	y: 205,
	orientation: 'E',
	mode: 'roam',
	unitMax: 60,
	lineMax: 30,
	unitCount: 0,
	lineCount: 0,
	color: '#ffbf9d',
	turnCount: 9240,
})

new Painter().set({
	x: 71,
	y: 193,
	orientation: 'N',
	mode: 'roam',
	unitMax: 60,
	lineMax: 30,
	unitCount: 0,
	lineCount: 0,
	color: '#fc0',
	turnCount: 9480,
})

new Painter().set({
	x: 146,
	y: 250,
	orientation: 'S',
	mode: 'paint',
	unitMax: 60,
	lineMax: 30,
	unitCount: 7,
	lineCount: 21,
	color: '#ffff14',
	turnCount: 8383,
})
