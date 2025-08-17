import {
	assertNumber
 } from './util/assert.js'
import { startStop } from './util/start-stop.js'

/**
 * @import { ExcameraLabsI2CDriverI2C } from '@johntalton/excamera-i2cdriver'
 * @import { I2CBufferSource, I2CAddress } from '@johntalton/and-other-delights'
 */

export const CHUNK_SIZE = 64

/**
 * @param {ExcameraLabsI2CDriverI2C} driver
 * @param {I2CAddress} address
 * @param {number} length
 * @param {I2CBufferSource|undefined} [readBufferOrUndefined]
 */
export async function i2cRead(driver, address, length, readBufferOrUndefined = undefined) {
	assertNumber(length)

	if(length > CHUNK_SIZE) { console.warn('chunk size exceed') }

	// if(readBufferOrUndefined === undefined) { console.log('bus alloc') }
	const readBuffer = readBufferOrUndefined ?? new ArrayBuffer(length)

	return startStop(driver, address, true, async () => {
		return driver.readNACKFinal(length, readBuffer)
	})
}
