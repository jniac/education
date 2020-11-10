
const getRandomColor = () => {

    if (Math.random() < 0.2) {
        return 'transparent'
    }

    if (Math.random() < 0.5) {
        return 'red'
    }

    return '#blue'
}

export const changeThatIcon = (div) => {

    const index = Math.ceil(7 * Math.random())
    div.className = 'icon-' + index

    div.style.color = getRandomColor()
}
