export async function i2cRead(driver, address, length, _readBuffer) {
	const CHUNK_SIZE = 64

	if(length <= 64) { return _i2cRead(driver, address, length, _readBuffer) }

	console.log('!! reading by chunk', length)

	const chunks = Math.floor(length / CHUNK_SIZE)
	const tail = length % CHUNK_SIZE

	const accumulator = new Uint8Array(length)

	const result = {
		bytesRead: 0,
		buffer: accumulator.buffer,
	}

	for(let i = 0; i < chunks; i += 1) {
		console.log('read chunk')
		const chunk = await _i2cRead(driver, address, CHUNK_SIZE, undefined)
		const offset = i * CHUNK_SIZE

		accumulator.set(new Uint8Array(chunk.buffer), offset)
		result.bytesRead += chunk.bytesRead
	}


	const tailChunk = await _i2cRead(driver, address, tail, undefined)
	const tailOffset = chunks * CHUNK_SIZE
	accumulator.set(new Uint8Array(tailChunk.buffer), tailOffset)
	result.bytesRead += tailChunk.bytesRead


	console.log(result)

	return result
}

export async function _i2cRead(driver, address, length, readBuffer) {
	const info = await driver._transmitStatusInfo()
	// console.log({ info })

	if(info.sda === 0 || info.scl === 0) {
		await driver.resetBus()
		throw new Error('invalid line state')
	}

	try {
		const startOk = await driver.start(address, true)
		if (startOk.ack !== 1) { throw new Error('no start ack') }

		// const buffer = await driver.readACKAll(length)
		const buffer = await driver.readNACKFinal(length)

		const bytesRead = buffer.byteLength

		const stopOk = await driver.stop()
		// console.log({ stopOk })

		return {
			bytesRead, buffer: buffer.buffer
		}
	}
	catch(e) {
		console.warn('stop on catch', e)
		const stopOk = await driver.stop()
		console.log({ stopOk })

		return {
			bytesRead: 0
		}
	}
}
