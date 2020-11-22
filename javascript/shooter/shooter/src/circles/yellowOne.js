import * as colors from '../colors.js'
import * as scene from '../core/scene.js'
import * as keyboard from '../core/keyboard.js'
import * as player from '../core/player.js'
import * as circles from '../core/circles.js'
import { clone, equals } from '../core/geom.js'
import { youwin } from '../UI.js'

const yellow = circles.create({
    name: 'yellow',
    color: colors.YELLOW,
    collideWith: [colors.YELLOW],
    radius: 80,
    positionX: scene.width * 0.66,
    positionY: 100,
    life: 10,
})



const fireColors = [colors.YELLOW, colors.BLUE]
let fireColorIndex = 0

const fire = () => {
    yellow.fireToward(player.position, fireColors[fireColorIndex])
    fireColorIndex = (fireColorIndex + 1) % fireColors.length
}




const initialPlayerPosition = clone(player.position)
let playerHasMoved = false

yellow.onUpdate.add(() => {

    // do not fire until the player made the first move
    if (playerHasMoved === false) {
        playerHasMoved = (
            equals(initialPlayerPosition, player.position) === false ||
            keyboard.downKeys.has(' ')
        )
    }

    if (playerHasMoved && scene.frame % 60 === 0) {
        fire()
    }
})



yellow.onDestroy.add(() => {
    youwin()
})
