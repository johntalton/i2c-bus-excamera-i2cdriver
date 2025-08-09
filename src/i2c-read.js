import { ExcameraLabsI2CDriverI2C } from '@johntalton/excamera-i2cdriver'
import {
	assertNumber
 } from './util/assert.js'
import { startStop } from './util/start-stop.js'

const CHUNK_SIZE = 64

/**
 * @param {ExcameraLabsI2CDriverI2C} driver
 * @param {ArrayBuffer|ArrayBufferView|undefined} readBufferOrUndefined
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
