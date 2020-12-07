import hash from './hash.js'

export const initToggleButton = token => {

    const div = document.querySelector(`div.toggle-button.${token}`)

    let active = hash.has(token)
    
    const update = () => {
        if (active) {
            div.classList.add('active')
            document.documentElement.classList.add(token)
            hash.add(token)
        } else {
            div.classList.remove('active')
            document.documentElement.classList.remove(token)
            hash.remove(token)
        }
    }
    
    const setActive = (value) => {
        
        if (active === value) {
            return
        }
    
        active = value
        update()
    }
    
    update()

    div.onclick = () => setActive(!active)
}
