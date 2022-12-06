export async function writeI2cBlock(driver, addr, reg, bufferSource) {
	// console.log('writeI2cBlock', reg, bufferSource)

	//console.log('* start write', addr)
	const startOk = await driver.start(addr, false)
	//console.log({ startOk })

	//console.log('* write address')
	const writeAddrOk = await driver.write(1, Uint8Array.from([ reg ]))
	//console.log({ writeAddrOk })

	const length = bufferSource.byteLength
	const writeOk = await driver.write(length, bufferSource)
	// console.log({ writeOk })

	// console.log('*stop')
	await driver.stop()
	// console.log('stop')

	return {
		bytesWritten: length,
		buffer: ArrayBuffer.isView(bufferSource) ? bufferSource.buffer : bufferSource
	}
}
