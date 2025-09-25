import { i2cRead } from './i2c-read.js'
import { i2cWrite } from './i2c-write.js'
import { readI2cBlock } from './read-i2c-block.js'
import { writeI2cBlock } from './write-i2c-block.js'

/**
 * @import { I2CBus, I2CAddress, I2CBufferSource, I2CCommand } from '@johntalton/and-other-delights'
 * @import { ExcameraLabsI2CDriverI2C } from '@johntalton/excamera-i2cdriver'
 * */

/** @implements {I2CBus} */
export class I2CBusExcameraI2CDriver {
	/** @type {ExcameraLabsI2CDriverI2C} */
	#driver

	/**
	 * @param {ExcameraLabsI2CDriverI2C} driver
	 */
	static from(driver) { return new I2CBusExcameraI2CDriver(driver) }

	/**
	 * @param {ExcameraLabsI2CDriverI2C} driver
	 */
	constructor(driver) { this.#driver = driver }

	get supportsScan() { return true }
	get supportsMultiByteDataAddress() { return true }

	get name() {
		// _transmitStatusInfo identifier / serial
		return 'Excamera-I2CDriver'
	}

	close() {}

	/**
	 * @param {I2CAddress} address
	 * @param {number} byteValue
	 */
	async sendByte(address, byteValue) {
		// is this equivalent?
		await i2cWrite(this.#driver, address, 1, Uint8Array.from([ byteValue ]))
	}

	/**
	 * @param {I2CAddress} address
	 * @param {I2CCommand} cmd
	 * @param {number} length
	 * @param {I2CBufferSource} [readBuffer]
	 */
	async readI2cBlock(address, cmd, length, readBuffer) {
		return readI2cBlock(this.#driver, address, cmd, length, readBuffer)
	}

	/**
	 * @param {I2CAddress} address
	 * @param {I2CCommand} cmd
	 * @param {number} length
	 * @param {I2CBufferSource} bufferSource
	 */
	async writeI2cBlock(address, cmd, length, bufferSource) {
		return writeI2cBlock(this.#driver, address, cmd, length, bufferSource)
	}

	/**
	 * @param {I2CAddress} address
	 * @param {number} length
	 * @param {I2CBufferSource} [readBuffer]
	 */
	async i2cRead(address, length, readBuffer) {
		return i2cRead(this.#driver, address, length, readBuffer)
	}

	/**
	 * @param {I2CAddress} address
	 * @param {number} length
	 * @param {I2CBufferSource} bufferSource
	 */
	async i2cWrite(address, length, bufferSource) {
		return i2cWrite(this.#driver, address, length, bufferSource)
	}

	async scan() {
		// raw driver scan returns list of all devices (dev) and acked (ack) status
		//  filter/map down to match normalized scan method
		return (await this.#driver.scan())
			.filter(({ ack }) => ack === 1)
			.map(({ dev }) => dev)
	}
}
