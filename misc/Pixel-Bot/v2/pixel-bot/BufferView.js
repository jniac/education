
export default class BufferView {

    constructor(buffer, headByteLength = 0) {

        this.buffer = buffer

        this.headView = new DataView(buffer, 0, headByteLength)

        this.view = new DataView(buffer, headByteLength)
        this.offset = 0
        this.headByteLength = headByteLength

    }

    hasFinished() {

        return this.headByteLength + this.offset >= this.buffer.byteLength

    }

    getUint8() {

        return this.view.getUint8(this.offset++)

    }

    setUint8(value) {

        this.view.setUint8(this.offset++, value)

    }

    getUint16() {

        let { offset } = this

        this.offset += 2

        return this.view.getUint16(offset)

    }

    setUint16(value) {

        let { offset } = this

        this.offset += 2

        this.view.setUint16(offset, value)

    }

    getUint24() {

        let a = this.view.getUint8(this.offset++)
        let b = this.view.getUint8(this.offset++)
        let c = this.view.getUint8(this.offset++)

        return (a << 16) + (b << 8) + c

    }

    setUint24(value) {

        let a = value >> 16
        let b = value >> 8 & 0xff
        let c = value & 0xff

        this.view.setUint8(this.offset++, a)
        this.view.setUint8(this.offset++, b)
        this.view.setUint8(this.offset++, c)

    }

}
