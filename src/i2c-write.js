export async function i2cWrite(driver, address, length, sourceBuffer) {
	const startOk = await driver.start(address, false)
	if (startOk.ack !== 1) { throw new Error('no start ack') }

	console.log({ sourceBuffer })
	await driver.write(length, sourceBuffer)

	await driver.stop()

	return {
		bytesWritten: length,
		buffer: sourceBuffer.buffer
	}
}
