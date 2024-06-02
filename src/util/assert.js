export function assertDriver(driver) {
  if(driver === undefined) { throw new Error('driver undefined') }
}

export function assertNumber(value) {
  if(typeof value !== 'number') { throw new Error('value must be a number') }
}

export function assertBufferSource(buffer) {
  if(ArrayBuffer.isView(buffer)) { return true }
  if(buffer instanceof ArrayBuffer) { return true }
  // if(buffer instanceof SharedArrayBuffer) { return true }

  throw new Error('invalid buffer')
}