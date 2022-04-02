export async function i2cWrite(driver, address, length, bufferSource) {
	const startOk = await driver.start(address, false)
	if (startOk.ack !== 1) { throw new Error('no start ack') }

	console.log({ bufferSource })
	await driver.write(length, bufferSource)

	await driver.stop()

	return {
		bytesWritten: length,
		buffer: bufferSource.buffer
	}
}
