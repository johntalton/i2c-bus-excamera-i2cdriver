import { I2CBus } from '@johntalton/and-other-deligths'

export class I2CBusExcameraI2cDriver extends I2CBus {
	#driver

	static from(driver) { return new I2CBusExcameraI2cDriver(driver) }

	constructor(driver) { this.#driver = driver }

	close() {}

	async sendByte(address, byteValue) {
		// is this equilvilant
		return i2cWrite(this.#driver, address, 1, Uint8Array.from([ byteValue ]))
	}

	async readI2CBlock(address, cmd, length, bufferSource) {
		// todo read back into bufferSource and return
		return readRegister(this.#driver, address, cmd, length)
	}

	async writeI2cBlock(address, cmd, length, bufferSource) {
		// todo ... create view / slice buffer source to length
		return writeRegister(this.#driver, address, cmd, bufferSource)
	}

	async i2cRead(address, length, bufferSource) {
		return i2cRead(this.#driver, address, length, bufferSource)
	}

	async i2cWrite(address, length, bufferSource) {
		return i2cWrite(this.#driver, address, length, bufferSource)
	}
}
