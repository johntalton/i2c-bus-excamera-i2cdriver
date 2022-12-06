export async function i2cRead(driver, address, length, readBuffer) {
	const info = await driver._transmitStatusInfo()
	// console.log({ info })

	if(info.sda === 0 || info.scl === 0) {
		await driver.resetBus()
		throw new Error('invalid line state')
	}

	try {
		const startOk = await driver.start(address, true)
		if (startOk.ack !== 1) { throw new Error('no start ack') }

		const buffer = await driver.readACKAll(length)
		// const buffer = await driver.readNACKFinal(length)

		const bytesRead = buffer.byteLength

		const stopOk = await driver.stop()
		// console.log({ stopOk })

		return {
			bytesRead, buffer: buffer.buffer
		}
	}
	catch(e) {
		console.warn('stop on catch', e)
		const stopOk = await driver.stop()
		console.log({ stopOk })
	}
}
