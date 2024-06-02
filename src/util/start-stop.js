import { ExcameraLabsI2CDriverI2C } from '@johntalton/excamera-i2cdriver'
import { assertDriver, assertNumber } from './assert.js'
import { readyOrReset } from './ready.js'

/**
 * @param {ExcameraLabsI2CDriverI2C} driver
 * @param {number} address
 * @param {boolean} read
*/
export async function startStop(driver, address, read, cb) {
	assertDriver(driver)
	assertNumber(address)

	await readyOrReset(driver)

	const startOk = await driver.start(address, read)
	if (startOk.ack !== 1) {
		await driver.stop()
		throw new Error('no start ack')
	}

	return Promise.resolve(cb())
		.then(async result => {
			await driver.stop()
			return result
		})
}