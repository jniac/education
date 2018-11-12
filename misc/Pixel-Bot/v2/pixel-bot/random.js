
const randomMinMax = (min, max) => min + (max - min) * Math.random()

const random = (...args) => {

    if (args.length === 1) {

        let [arg] = args

        if (arg instanceof Array) {

            return arg[Math.floor(arg.length * Math.random())]

        } else if (typeof arg === 'number') {

            return arg * Math.random()

        } else if (typeof arg === 'object') {

            let { min = 0, max = 1, type = 'float' } = arg

            if (type === 'int') {

                return Math.floor(randomMinMax(min, max))

            }

            return randomMinMax(min, max)

        }

    } else if (args.length === 2) {

        let [min, max] = args

        return min + (max - min) * Math.random()

    }

    throw `random.js Error, can not interpret arguments: ${args}`

}

export default random
