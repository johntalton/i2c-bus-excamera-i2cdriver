
/**
 * @param {number} addr
 * @param {number|ArrayBufferLike|ArrayBufferView} reg
 * @param {number} length
 */
export async function readI2cBlock(driver, addr, reg, length) {
	const startOk = await driver.start(addr, false)

	const regBuffer = typeof reg === 'number' ? Uint8Array.from([ reg ]) : reg
	const writeAddrOk = await driver.write(regBuffer.byteLength, regBuffer)

	const startReadOk = await driver.start(addr, true)

	const buffer = await driver.readNACKFinal(length)
	const bytesRead = buffer.byteLength

	const stopOk = await driver.stop()

	return {
		bytesRead, buffer: buffer.buffer
	}
}
