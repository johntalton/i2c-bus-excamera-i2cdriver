import {
	assertArray,
	assertNumber
 } from './util/assert.js'
import { readyOrReset } from './util/ready.js'
import { write } from './util/write.js'

/**
 * @import { ExcameraLabsI2CDriverI2C } from '@johntalton/excamera-i2cdriver'
 * @import { I2CAddress, I2CReadResult, I2CBufferSource } from '@johntalton/and-other-delights'
 * */

/**
 * @param {I2CAddress} address
 * @param {number|[number, number]} register
 * @param {number} length
 * @param {I2CBufferSource} [readBufferOrUndefined]
 * @param {ExcameraLabsI2CDriverI2C} driver
 * @returns {Promise<I2CReadResult>}
 */
export async function readI2cBlock(driver, address, register, length, readBufferOrUndefined = undefined) {
	const readBuffer = readBufferOrUndefined ?? new ArrayBuffer(length)

	// if(readBuffer !== undefined && ArrayBuffer.isView(readBuffer) && readBuffer.buffer.detached) { throw new Error('detached') }
	// if(readBuffer !== undefined && !ArrayBuffer.isView(readBuffer) && readBuffer.detached) { throw new Error('detached') }

	if(false) {
		// note - while this method is much faster as it has an optimized call
		//  in the driver, it suffers from not checking the ACK bit and thus
		//  always returning success, it is however more resilient to early
		//  termination of the process as the command finish on device with a
		//  valid stop, where as our software version bellow may not always
		// await readyOrReset(driver)
		// return driver.readRegister(address, register, length, readBuffer) // TODO this does not support 16-bit reads
	}

	if(Array.isArray(register)) { assertArray(register, 2) } else { assertNumber(register) }

	const registerBuffer = Array.isArray(register) ? Uint8Array.from(register) : Uint8Array.from([ register ])

	return write(driver, address, registerBuffer.byteLength, registerBuffer, async () => {
		const startReadOk = await driver.start(address, true)
		if (startReadOk.ack !== 1) { throw new Error('no start ack') }

		return driver.readNACKFinal(length, readBuffer)
	})
}
