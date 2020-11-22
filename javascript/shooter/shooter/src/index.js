import './core/player.js'
import './circles/staticOnes.js'
import './circles/yellowOne.js'
import './circles/movingBlue.js'

document.querySelector('button#restart').addEventListener('click', () => {
    window.location.reload()
})