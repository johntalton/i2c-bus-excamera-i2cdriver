import { ExcameraLabsI2CDriverI2C } from '@johntalton/excamera-i2cdriver'
import {
	assertNumber,
	assertBufferSource,
	assertArray
 } from './util/assert.js'
import { write } from './util/write.js'

/**
 * @param {number} address
 * @param {ExcameraLabsI2CDriverI2C} driver
 * @param {number} register
 * @param {ArrayBuffer|ArrayBufferView} bufferSource
 */
export async function writeI2cBlock(driver, address, register, length, bufferSource) {
	assertBufferSource(bufferSource)
	if(Array.isArray(register)) { assertArray(register, 2) } else { assertNumber(register) }

	const registerBuffer = Array.isArray(register) ? Uint8Array.from(register) : Uint8Array.from([ register ])
	const scratch = new Blob([ registerBuffer, bufferSource ])
	const buffer = await scratch.arrayBuffer()

	return write(driver, address, buffer.byteLength, buffer, () => {
		return {
			bytesWritten: length,
			buffer: bufferSource
		}
	})
}
