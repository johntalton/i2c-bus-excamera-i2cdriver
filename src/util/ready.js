
export async function readyOrReset(driver) {
  const info = await driver.transmitStatusInfo()

	if(info.sda === 0 || info.scl === 0) {
		console.error('this is not good ', info)
		// await driver.resetBus()
		// throw new Error('bus not ready, reset')
	}
}
