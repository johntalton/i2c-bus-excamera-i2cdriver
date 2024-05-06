import { i2cRead } from './i2c-read.js'
import { i2cWrite } from './i2c-write.js'
import { readI2cBlock } from './read-i2c-block.js'
import { writeI2cBlock } from './write-i2c-block.js'

export class I2CBusExcameraI2CDriver {
	#driver

	static from(driver) { return new I2CBusExcameraI2CDriver(driver) }

	constructor(driver) { this.#driver = driver }

	get name() {
		// _transmitStatusInfo identifier / serial
		return 'excamera:bus'
	}

	close() {}

	async sendByte(address, byteValue) {
		// is this equivalent?
		return i2cWrite(this.#driver, address, 1, Uint8Array.from([ byteValue ]))
	}

	async readI2cBlock(address, cmd, length, bufferSource) {
		// todo read back into bufferSource and return
		return readI2cBlock(this.#driver, address, cmd, length)
	}

	async writeI2cBlock(address, cmd, length, bufferSource) {
		// todo ... create view / slice buffer source to length
		return writeI2cBlock(this.#driver, address, cmd, bufferSource)
	}

	async i2cRead(address, length, bufferSource) {
		return i2cRead(this.#driver, address, length, bufferSource)
	}

	async i2cWrite(address, length, bufferSource) {
		return i2cWrite(this.#driver, address, length, bufferSource)
	}
}
