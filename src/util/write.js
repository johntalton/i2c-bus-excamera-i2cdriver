import { assertBufferSource, assertNumber } from './assert.js'
import { startStop } from './start-stop.js'

/**
 * @import { ExcameraLabsI2CDriverI2C } from '@johntalton/excamera-i2cdriver'
 * @import { I2CAddress, I2CBufferSource } from '@johntalton/and-other-delights'
 * */

/**
 * @template T
 * @param {ExcameraLabsI2CDriverI2C} driver
 * @param {I2CAddress} address
 * @param {number} length
 * @param {I2CBufferSource} buffer
 * @param {function (): Promise<T>} cb
 * @returns {Promise<T>}
 */
export async function write(driver, address, length, buffer, cb) {
	assertNumber(length)
	assertBufferSource(buffer)

	return startStop(driver, address, false, async () => {
		const writeOk = await driver.write(length, buffer)
		if(writeOk.ack !== 1) { throw new Error('write not acked') }

		return cb()
  })
}