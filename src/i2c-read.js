export async function i2cRead(driver, address, length, readBuffer) {
	const startOk = await driver.start(address, true)
	if (startOk.ack !== 1) { throw new Error('no start ack') }

	const buffer = await driver.readNACKFinal(length)
	const bytesRead = buffer.byteLength

	await driver.stop()

	return {
		bytesRead, buffer: buffer.buffer
	}
}
