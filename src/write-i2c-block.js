import {
	assertNumber,
	assertBufferSource,
	assertArray
 } from './util/assert.js'
import { write } from './util/write.js'

/**
 * @import { ExcameraLabsI2CDriverI2C } from '@johntalton/excamera-i2cdriver'
 * @import { I2CAddress, I2CBufferSource, I2CWriteResult } from '@johntalton/and-other-delights'
 */

/**
 * @param {I2CAddress} address
 * @param {ExcameraLabsI2CDriverI2C} driver
 * @param {number} register
 * @param {I2CBufferSource} bufferSource
 */
export async function writeI2cBlock(driver, address, register, length, bufferSource) {
	assertBufferSource(bufferSource)
	if(Array.isArray(register)) { assertArray(register, 2) } else { assertNumber(register) }

	const registerBuffer = Array.isArray(register) ? Uint8Array.from(register) : Uint8Array.from([ register ])
	const scratch = new Blob([ registerBuffer, bufferSource ])
	const buffer = await scratch.arrayBuffer()

	return write(driver, address, buffer.byteLength, buffer, async () => {
		return {
			bytesWritten: length,
			buffer: bufferSource
		}
	})
}
