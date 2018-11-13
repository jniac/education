
let hash = {}

const parse = (string = window.location.hash) => {

    for (let key in hash)
        delete hash[key]

    for (let part of string.split(/[#,]/)) {

        if (part === '')
            continue

        let [key, value] = part.split(':')

        if (value === undefined) {

            value = key

            hash.art = value.replace(/\.js$/, '') + '.js'

        } else {

            hash[key] = value

        }

    }

}

parse()

window.addEventListener('hashchange', () => window.location.reload())

export default hash
