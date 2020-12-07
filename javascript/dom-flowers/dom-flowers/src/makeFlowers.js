
const getStyleTransform = (angle, radius, scale) => {
    return `translate(-50%, -50%) rotate(${angle}deg) translateX(${radius}px) scale(${scale})`
}

export const makeFlower = (sourceSelector, { 
    petalCount = 5,
    radius = 300,
    scale = 1,
    angleOffset = 0,
    forEachPetal = null,
    rotation = 0,
}) => {

    const element = document.querySelector(sourceSelector)
    const main = document.querySelector('main')

    for (let index = 0; index < petalCount; index++) {

        const petal = element.cloneNode(true)
        main.append(petal)

        petal.style.position = 'absolute'
        petal.style.left = '50%'
        petal.style.top = '50%'

        const angle = angleOffset + 360 * index / petalCount
        petal.style.transform = `translate(-50%, -50%) rotate(${angle}deg) translate(${radius}px, 0) scale(${scale}) rotate(${rotation}deg)`

        forEachPetal?.(petal, index)
    }

    // why? dunno...
    document.body.scrollTop = 0
}