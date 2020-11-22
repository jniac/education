import * as scene from './core/scene.js'

const gameover = () => {

    scene.pause()

    document.querySelector('div.gameover').style.display = null
}

const youwin = () => {

    scene.pause()
    document.querySelector('div.youwin').style.display = null
}

export {
    gameover,
    youwin,
}