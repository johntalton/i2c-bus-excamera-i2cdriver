import { assertDriver, assertNumber } from './assert.js'
import { readyOrReset } from './ready.js'

/**
 * @import { ExcameraLabsI2CDriverI2C } from '@johntalton/excamera-i2cdriver'
 * @import { I2CAddress } from '@johntalton/and-other-delights'
*/

/**
 * @template T
 * @param {ExcameraLabsI2CDriverI2C} driver
 * @param {I2CAddress} address
 * @param {boolean} read
 * @param {function(): Promise<T>} cb
*/
export async function startStop(driver, address, read, cb) {
	assertDriver(driver)
	assertNumber(address)

	await readyOrReset(driver)

	const { ack } = await driver.start(address, read)
	if (ack !== 1) {
		await driver.stop()
		throw new Error('no start ack')
	}

	return Promise.resolve()
		.then(() => cb())
		.finally(() => driver.stop())
}