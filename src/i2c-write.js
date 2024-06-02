import { write } from './util/write.js'

 /**
 * @param {number} address
 * @param {number} length
 * @param {number} length
 * @param {ArrayBufferLike|ArrayBufferView} bufferSource
 */
export async function i2cWrite(driver, address, length, bufferSource) {
	return write(driver, address, length, bufferSource, () => {
		return {
			bytesWritten: length,
			buffer: ArrayBuffer.isView(bufferSource) ? bufferSource.buffer : bufferSource
		}
	})
}
