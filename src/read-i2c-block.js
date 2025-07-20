import { ExcameraLabsI2CDriverI2C } from '@johntalton/excamera-i2cdriver'
import {
	assertNumber
 } from './util/assert.js'
import { readyOrReset } from './util/ready.js'
import { write } from './util/write.js'

/**
 * @param {number} address
 * @param {number} register
 * @param {number} length
 * @param {ArrayBufferLike|ArrayBufferView|undefined} readBufferOrUndefined
 * @param {ExcameraLabsI2CDriverI2C} driver
 */
export async function readI2cBlock(driver, address, register, length, readBufferOrUndefined = undefined) {
	// if(readBufferOrUndefined === undefined) { console.log('bus alloc') }
	const readBuffer = readBufferOrUndefined ?? new ArrayBuffer(length)

	if(false) {
		// note - while this method is much faster as it has an optimized call
		//  in the driver, it suffers from not checking the ACK bit and thus
		//  always returning success, it is however more resiliant to early
		//  termination of the process as the command finish on device with a
		//  valid stop, where as our software version bellow may not always
		await readyOrReset(driver)
		return driver.readRegister(address, register, length, readBuffer)
	}

	assertNumber(register)

	return write(driver, address, 1, Uint8Array.from([ register ]), async () => {
		const startReadOk = await driver.start(address, true)
		if (startReadOk.ack !== 1) { throw new Error('no start ack') }

		return driver.readNACKFinal(length, readBuffer)
	})
}
