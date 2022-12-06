export async function readI2cBlock(driver, addr, reg, length) {
	// console.log('> start write', addr)
	const startOk = await driver.start(addr, false)
	// console.log({ startOk })

	//
	// console.log('> write register address')
	const writeAddrOk = await driver.write(1, Uint8Array.from([reg]))
	// console.log({ writeAddrOk })

	//
	// console.log('> start read')
	const startReadOk = await driver.start(addr, true)
	// console.log({ startReadOk })

	const buffer = await driver.readNACKFinal(length)
	const bytesRead = buffer.byteLength

	//
	const stopOk = await driver.stop()
	// console.log({ stopOk })

	return {
		bytesRead, buffer: buffer.buffer
	}
}
