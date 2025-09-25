# Excamera I2CDriver I2CBus

Provides API over the Excamera I2CDriver to provide a `I2CBus` interface.


[![npm Version](http://img.shields.io/npm/v/@johntalton/i2c-bus-excamera-i2cdriver.svg)](https://www.npmjs.com/package/@johntalton/i2c-bus-excamera-i2cdriver)
![GitHub package.json version](https://img.shields.io/github/package-json/v/johntalton/i2c-bus-excamera-i2cdriver)
[![CI](https://github.com/johntalton/i2c-bus-excamera-i2cdriver/actions/workflows/CI.yml/badge.svg)](https://github.com/johntalton/i2c-bus-excamera-i2cdriver/actions/workflows/CI.yml)

# I2CBus

While the [Excamera i2cDriver](https://github.com/johntalton/excamera-i2cdriver) itself provides a wider range of features to manage the I²C bus, this library provides a concrete implementation of the  [`I2CBus`](https://github.com/johntalton/and-other-delights) interface.

# Example

```javascript
import { ExcameraLabsI2CDriver, ExcameraLabsI2CDriverI2C } from '@johntalton/excamera-i2cdriver'
import { I2CBusExcameraI2CDriver } from '@johntalton/i2c-bus-excamera-i2cdriver'

// the i2cdriver is a serial device
// both the WebSerial and Node SerialPort can be used as a source
// the underlying code assumes only it is a ReadableWritablePair
const port = /* some ReadableWritablePair like a WebSerial port */

// using i2cdriver static methods directly to setup speed
// not required, used as example
await ExcameraLabsI2CDriver.setSpeed(port, 400)

// create an instance of the driver
const i2cdriver = ExcameraLabsI2CDriverI2C.from({ port })

// use to create a I2CBus
const bus = new I2CBusExcameraI2CDriver(i2cdriver)

// now the bus can be used in a wide range of drivers or other compatible implementations
// or directly as follows
for(const address of bus.scan()) {
  console.log('found address', address.toString(16))
}
```