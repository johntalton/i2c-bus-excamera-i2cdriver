export async function readRegister(driver, addr, reg, length) {
	console.log('> start write', addr)
	const startOk = await driver.start(addr, false)
	console.log({ startOk })

	//
	console.log('> write register address')
	const writeAddrOk = await driver.write(1, Uint8Array.from([reg]))
	console.log({ writeAddrOk })

	//
	console.log('> start read')
	const startReadOk = await driver.start(addr, true)
	console.log({ startReadOk })

	const readOk = await driver.readNACKFinal(length)
	console.log({ readOk })

	//
	console.log('stop')
	await driver.stop()
}
