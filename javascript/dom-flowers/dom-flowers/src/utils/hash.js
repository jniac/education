
const tokens = new Set(window.location.hash.substr(1).split(',').filter(v => v))

export default {

    has: (token) => tokens.has(token),

    add: (token) => {
        tokens.add(token)
        window.location.hash = [...tokens].join(',')
    },
    
    remove: (token) => {
        tokens.delete(token)
        window.location.hash = [...tokens].join(',')
    },
}
