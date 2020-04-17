const EventEmitter = () => {
  const activeEvents = {} // TODO change object to Map
  // activeEvents[nameOfEmitter][callbackFunction.name] =
  // [callbackFunction, emitOnce]
  // emit infinitely if second variable in array is true
  return {
    on: (nameOfEmitter, callbackFunction) => {
      if (activeEvents[nameOfEmitter] === undefined) {
        activeEvents[nameOfEmitter] = {}
      }
      activeEvents[nameOfEmitter][callbackFunction.name] = [
        callbackFunction,
        false
      ]
    },
    off: (nameOfEmitter, callbackFunction) => {
      if (activeEvents[nameOfEmitter][callbackFunction.name]) {
        delete activeEvents[nameOfEmitter][callbackFunction.name]
      }
    },
    once: (nameOfEmitter, callbackFunction) => {
      if (activeEvents[nameOfEmitter] === undefined) {
        activeEvents[nameOfEmitter] = {}
      }
      activeEvents[nameOfEmitter][callbackFunction.name] = [
        callbackFunction,
        true
      ]
    },
    emit: (nameOfEmitter, functionInput) => {
      if (activeEvents[nameOfEmitter] !== undefined) {
        for (const [callbackFunctionName, callbackArray] of Object.entries(
          activeEvents[nameOfEmitter]
        )) {
          let callbackFunction = callbackArray[0]
          callbackFunction(functionInput)
          let emitOnce = callbackArray[1]
          if (emitOnce === true) {
            delete activeEvents[nameOfEmitter][callbackFunction.name]
          }
        }
      }
    }
  }
}

module.exports = {
  EventEmitter
}

/* Original test cases -- refactored into spec.js

////////////
const responseToEvent = (msg) => {
  console.log(msg)
}

const eventEmitter = EventEmitter()
////////////

// on: call it everytime it emits the vent
eventEmitter.on("pramp", responseToEvent)
// once: call it the first time then stop listening
eventEmitter.once("pramp", function (msg) {
  console.log(msg + " just once!")
})
// emit: run callbacks
eventEmitter.emit("pramp", "1st")
eventEmitter.emit("pramp", "2nd")
// off: remove specified event listener
eventEmitter.off("pramp", responseToEvent)
eventEmitter.emit("pramp", "3rd")
eventEmitter.emit("pramp", "1st")
*/
