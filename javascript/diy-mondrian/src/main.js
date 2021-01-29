
const colors = ['#fc0', '#e12', '#03c', '#fff', '#fff', '#fff']
const getRandomColor = () => {
    const index = Math.floor(colors.length * Math.random())
    return colors[index]
}

document.querySelector('main').onmousedown = (event) => {

    const { target } = event
    const rect = target.getBoundingClientRect()

    let { x, y } = event
    x = x - rect.x 
    y = y - rect.y

    console.log({ x, y })

    const className = event.shiftKey ? 'vertical' : 'horizontal'
    target.classList.add(className)
    target.innerHTML = `
        <div class="first" style="background-color: ${getRandomColor()}; flex: 0 0 ${event.shiftKey ? x : y}px"></div>
        <div class="separator"></div>
        <div class="second" style="background-color: ${getRandomColor()};"></div>
    `
}
