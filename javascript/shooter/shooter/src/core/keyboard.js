
const downKeys = new Set()

const onKeydown = new Set()
const onKeyup = new Set()

window.addEventListener('keydown', event => {

    const { key } = event
    const KEY = key.toUpperCase()
    if (downKeys.has(KEY) === false) {
        downKeys.add(key)
        downKeys.add(KEY)

        for (const callback of onKeydown) {
            callback(key, KEY)
        }
    }
})

window.addEventListener('keyup', event => {

    const { key } = event
    const KEY = key.toUpperCase()
    downKeys.delete(key)
    downKeys.delete(KEY)

    for (const callback of onKeyup) {
        callback(key, KEY)
    }
})

export {
    downKeys,
    onKeydown,
    onKeyup,
}
