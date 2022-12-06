export async function i2cWrite(driver, address, length, bufferSource) {
	const info = await driver._transmitStatusInfo()
	//console.log({ info })

	if(info.sda === 0 || info.scl === 0) {
		await driver.resetBus()
		throw new Error('invalid line state')
	}

	try {
		const startOk = await driver.start(address, false)
		if (startOk.ack !== 1) { throw new Error('no start ack') }

		const writeOk = await driver.write(length, bufferSource)
		//console.log({ writeOk })

		const stopOk = await driver.stop()
		//console.log({ stopOk })

		return {
			bytesWritten: length,
			buffer: bufferSource.buffer
		}
	}
	catch(e) {
		console.warn('stop on catch', e)
		const stopOk = await driver.stop()
		console.log({ stopOk })

		return {
			bytesWritten: 0
		}
	}
}
