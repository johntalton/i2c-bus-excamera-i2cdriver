
function isArrayBufferLike(thing) {
	if(typeof thing === 'ArrayBuffer') { return true }
	if(thing.byteLength !== undefined && thing.buffer !== undefined) { return true }
	if(ArrayBuffer.isView(thing)) { return true}

	return false
}

/**
 * @param {number} addr
 * @param {*} driver
 * @param {number|ArrayBufferLike|ArrayBufferView} reg
 * @param {ArrayBufferLike|ArrayBufferView} bufferSource
 */
export async function writeI2cBlock(driver, addr, reg, bufferSource) {
	const startOk = await driver.start(addr, false)

	const regBuffer = isArrayBufferLike(reg) ? reg : Uint8Array.from([ reg ])
	const writeAddrOk = await driver.write(regBuffer.byteLength, regBuffer.buffer)

	const length = bufferSource.byteLength
	const writeOk = await driver.write(length, bufferSource)

	await driver.stop()

	return {
		bytesWritten: length,
		buffer: ArrayBuffer.isView(bufferSource) ? bufferSource.buffer : bufferSource
	}
}
