
export const readonly = (target, props, { enumerable = true, writable = true } = {}) => {

    for(let [name, value] of Object.entries(props)) {

        Object.defineProperty(target, name, { enumerable, writable, value })

    }

}

export const getter = (target, props, { enumerable = true } = {}) => {

    for(let [name, get] of Object.entries(props)) {

        Object.defineProperty(target, name, { enumerable, get })

    }

}

export const getterSetter = (target, props, { enumerable = true } = {}) => {

    for(let [name, { get, set }] of Object.entries(props)) {

        Object.defineProperty(target, name, { enumerable, get, set })

    }

}
