import { ExcameraLabsI2CDriverI2C } from '@johntalton/excamera-i2cdriver'
import {
	assertNumber,
	assertBufferSource
 } from './util/assert.js'
import { write } from './util/write.js'

/**
 * @param {number} address
 * @param {ExcameraLabsI2CDriverI2C} driver
 * @param {number} register
 * @param {ArrayBufferLike|ArrayBufferView} bufferSource
 */
export async function writeI2cBlock(driver, address, register, length, bufferSource) {
	assertNumber(register)
	assertBufferSource(bufferSource)

	const scratch = new Blob([ Uint8Array.from([ register ]), bufferSource ])
	const buffer = await scratch.arrayBuffer()

	return write(driver, address, buffer.byteLength, buffer, () => {
		// console.log('writeI2cBlock', address, register, length, [...new Uint8Array(buffer)])
		return {
			bytesWritten: length,
			buffer: bufferSource
		}
	})
}
