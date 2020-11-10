
const getRandomColor = () => {

    if (Math.random() < 0.5) {
        if (Math.random() < 0.5) {
            return '#ccc'
        } else {
            return '#ddd'
        }
    }

    return '#eee'
}

export const changeThatSvg = (svg) => {

    const rects = svg.querySelectorAll('rect')
    for (const rect of rects) {

        const color = getRandomColor()
        rect.setAttributeNS(null, 'fill', color)
    }
}