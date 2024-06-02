import { assertBufferSource, assertNumber } from './assert.js'
import { startStop } from './start-stop.js'

export async function write(driver, address, length, buffer, cb) {
	assertNumber(length)
	assertBufferSource(buffer)

  return startStop(driver, address, false, async () => {
		// console.log('\ttryWrite', address, length, [...new Uint8Array(buffer)] )
		const writeOk = await driver.write(length, buffer)
		if(writeOk.ack != 1) { throw new Error('write not acked') }

		return cb()
  })
}