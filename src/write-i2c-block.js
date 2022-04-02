export async function writeRegister(driver, addr, reg, bufferSource) {
	//console.log('* start write', addr)
	const startOk = await driver.start(addr, false)
	//console.log({ startOk })

	//console.log('* write address')
	const writeAddrOk = await driver.write(1, Uint8Array.from([ reg ]))
	//console.log({ writeAddrOk })

	const length = bufferSource.byteLength
	const writeOk = await driver.write(length, bufferSource)
	//console.log({ writeOk })

	//console.log('*stop')
	await driver.stop()

	return {
		bytesWritten: length,
		buffer: bufferSource.buffer
	}
}
