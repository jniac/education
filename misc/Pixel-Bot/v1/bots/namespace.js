
let currentNamespace = null

let dict = {}

const splitIdentifier = identifier => identifier.split(':').reverse()
const buildIdentifier = (name, namespace = currentNamespace) => namespace ? namespace + ':' + name : name
const safeIdentifier = identifier => buildIdentifier(...splitIdentifier(identifier))

let get = identifier => dict[safeIdentifier(identifier)]

let search = (identifier) => {

    if (!identifier)
        return null

    if (dict.hasOwnProperty(identifier))
        return dict[identifier]

    let [name, namespace] = splitIdentifier(identifier)

    if (namespace)
        return null

    identifier = buildIdentifier(name, currentNamespace)

    if (dict.hasOwnProperty(identifier))
        return dict[identifier]

    for (let [currentIdentifier, value] of Object.entries(dict)) {

        let [currentName, currentNamespace] = splitIdentifier(currentIdentifier)

        if (currentName === name)
            return value

    }

    return null

}

let getAvailableIdentifier = (identifier) => {

    identifier = safeIdentifier(identifier)

    if (!dict.hasOwnProperty(identifier))
        return identifier

    let base = identifier
    let index = 1

    do {

        identifier = base + '_' + index++

    } while (dict.hasOwnProperty(identifier))

    return identifier

}

let set = (identifier, value) => {

    identifier = safeIdentifier(identifier)

    dict[identifier] = value

}

let add = (identifier, value) => {

    identifier = getAvailableIdentifier(identifier)

    dict[identifier] = value

    return identifier

}

let register = {

    get,
    search,
    getAvailableIdentifier,
    set,
    add,
    dict,

    get currentNamespace() { return currentNamespace },
    set currentNamespace(value) { currentNamespace = value },

}

export {

    splitIdentifier,
    buildIdentifier,
    safeIdentifier,

}

export default register
