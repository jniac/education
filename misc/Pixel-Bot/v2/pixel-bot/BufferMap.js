
/**
 * Utility class.
 * The purpose is to batch pixels by colors (one color, multiple pixel indexes).
 * The complexity come from that in one update it could happen multiple addPixel with the same index, but different colors.
 * We HAVE TO remove the pixel index from the previous color batch (or the pixel will be split).
 */
export default class BufferMap extends Map {

    constructor() {

        super(...arguments)

        this.pixels = new Map()

    }

    addPixel(color, index) {

        let currentColor = this.pixels.get(index)

        if (currentColor !== undefined) {

            if (currentColor === color)
                return

            let indexes = this.get(currentColor)

            indexes.delete(index)

            if (indexes.size === 0) {

                this.delete(currentColor)

            }

        }

        this.pixels.set(index, color)

        let indexes = this.get(color)

        if (!indexes) {

            indexes = new Set()
            this.set(color, indexes)

        }

        indexes.add(index)

    }

    clear() {

        super.clear()

        this.pixels.clear()

    }

}
