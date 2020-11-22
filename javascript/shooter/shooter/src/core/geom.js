
/**
 * @param {{ x:number, y:number }} point 
 */
export const clone = (point) => {
    const { x, y } = point
    return { x, y }
}

/**
 * @param {{ x:number, y:number }} A 
 * @param {{ x:number, y:number }} B 
 */
export const equals = (A, B) => {
    return A.x === B.x && A.y === B.y
}

/**
 * @param {{ x:number, y:number }} point 
 */
export const squareLength = (point) => {
    const { x, y } = point
    return x * x + y * y
}

/**
 * @param {{ x:number, y:number }} point 
 */
export const length = (point) => {
    return Math.sqrt(squareLength(point))
}

/**
 * @param {{ x:number, y:number }} A 
 * @param {{ x:number, y:number }} B 
 */
export const squareDistance = (A, B) => {
    const x = B.x - A.x
    const y = B.y - A.y
    return x * x + y * y
}

/**
 * @param {{ x:number, y:number }} A 
 * @param {{ x:number, y:number }} B 
 */
export const distance = (A, B) => {
    return Math.sqrt(squareDistance(A, B))
}

/**
 * @param {{ x:number, y:number }} A 
 * @param {{ x:number, y:number }} B 
 */
export const subtract = (A, B) => {
    const x = B.x - A.x
    const y = B.y - A.y
    return { x, y }
}

/**
 * @param {{ x:number, y:number }} point 
 * @param {number} scale 
 */
export const normalize = (point, scale = 1) => {
    let { x, y } = point
    const r = scale / Math.sqrt(x * x + y * y)
    x *= r
    y *= r
    return { x, y }
}
