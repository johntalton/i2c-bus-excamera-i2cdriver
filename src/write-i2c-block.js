import {
	assertNumber,
	assertBufferSource,
	assertArray
 } from './util/assert.js'
import { write } from './util/write.js'

/**
 * @import { ExcameraLabsI2CDriverI2C } from '@johntalton/excamera-i2cdriver'
 * @import { I2CAddress, I2CBufferSource, I2CCommand } from '@johntalton/and-other-delights'
 */

/**
 * @param {ExcameraLabsI2CDriverI2C} driver
 * @param {I2CAddress} address
 * @param {I2CCommand} cmd
 * @param {number} length
 * @param {I2CBufferSource} bufferSource
 */
export async function writeI2cBlock(driver, address, cmd, length, bufferSource) {
	assertBufferSource(bufferSource)
	if(Array.isArray(cmd)) { assertArray(cmd, 2) } else { assertNumber(cmd) }

	const registerBuffer = Array.isArray(cmd) ? Uint8Array.from(cmd) : Uint8Array.from([ cmd ])

	const bufferSource8 = ArrayBuffer.isView(bufferSource) ?
		new Uint8Array(bufferSource.buffer, bufferSource.byteOffset, bufferSource.byteLength) :
		new Uint8Array(bufferSource)
	const buffer = new Uint8Array(registerBuffer.byteLength + length)
	buffer.set(registerBuffer)
	buffer.set(bufferSource8, registerBuffer.byteLength)

	return write(driver, address, buffer.byteLength, buffer, async () => {
		return {
			bytesWritten: length,
			buffer: bufferSource
		}
	})
}
