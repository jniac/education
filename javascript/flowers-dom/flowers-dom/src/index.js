import { initToggleButton } from './utils/toggle-button.js'
import { makeFlower } from './makeFlowers.js'

initToggleButton('library')
initToggleButton('dark')

makeFlower('.leaf-dots', {
    petalCount: 6,
    scale:4,
})

makeFlower('.square', {
    petalCount: 12,
    radius: 415,
    scale: 2.5,
    angleOffset: 30,
})

makeFlower('.leaf', {
    petalCount: 6,
    radius: 250,
    scale: 2,
    angleOffset: 30,
})

makeFlower('.drop', {
    petalCount: 6,
    scale: 1.2,
    radius: 300,
})

makeFlower('.arrow', {
    petalCount: 6,
    scale: .3,
    radius: 350,
    rotation: -90,
    // angleOffset: 30,
})

