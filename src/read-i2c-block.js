import {
	assertNumber
 } from './util/assert.js'
import { readyOrReset } from './util/ready.js'
import { write } from './util/write.js'

/**
 * @param {number} address
 * @param {number} register
 * @param {number} length
 */
export async function readI2cBlock(driver, address, register, length) {
	if(length === 1) {
		await readyOrReset(driver)
		const value = await driver.readRegister(address, register, length)
		return {
			bytesRead: 1,
			buffer: Uint8Array.from([ value ]).buffer
		}
	}

	assertNumber(register)

	return write(driver, address, 1, Uint8Array.from([ register ]), async () => {
		const startReadOk = await driver.start(address, true)
		if (startReadOk.ack !== 1) { throw new Error('no start ack') }

		const buffer = await driver.readNACKFinal(length)
		// console.log('readI2cBlock', address, register, length, [...new Uint8Array(buffer)])

		return {
			bytesRead: buffer.byteLength,
			buffer
		}
	})
}
