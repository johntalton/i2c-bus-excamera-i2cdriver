import { write } from './util/write.js'

/**
 * @import { ExcameraLabsI2CDriverI2C } from '@johntalton/excamera-i2cdriver'
 * @import { I2CAddress, I2CBufferSource, I2CWriteResult } from '@johntalton/and-other-delights'
 */

/**
 * @param {ExcameraLabsI2CDriverI2C} driver
 * @param {I2CAddress} address
 * @param {number} length
 * @param {I2CBufferSource} bufferSource
 * @returns {Promise<I2CWriteResult>}
 */
export async function i2cWrite(driver, address, length, bufferSource) {
	return write(driver, address, length, bufferSource, async () => {
		return {
			bytesWritten: length,
			buffer: ArrayBuffer.isView(bufferSource) ? bufferSource.buffer : bufferSource // TODO consider returning bufferSource as-is
		}
	})
}
