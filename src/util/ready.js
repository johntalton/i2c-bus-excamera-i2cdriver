/**
 * @import { ExcameraLabsI2CDriverI2C } from '@johntalton/excamera-i2cdriver'
 */

/**
 * @param {ExcameraLabsI2CDriverI2C} driver
 * @returns {Promise<void>}
 */
export async function readyOrReset(driver) {
	// return // fast read

  const info = await driver.transmitStatusInfo()

	if(info.sda === 0 || info.scl === 0) {
		console.error('this is not good ', info)
		// await driver.resetBus()
		// throw new Error('bus not ready, reset')
	}
}
