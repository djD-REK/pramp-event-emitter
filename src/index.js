import "./styles.css"

document.getElementById("app").innerHTML = `
<h1>Hello Vanilla!</h1>
<div>
  We use Parcel to bundle this sandbox, you can find more info about Parcel
  <a href="https://parceljs.org" target="_blank" rel="noopener noreferrer">here</a>.
</div>
`

const EventEmitter = () => {
  const activeEvents = {} // TODO change object to Map
  // activeEvents[nameOfEmitter][callbackFunction.name] =
  // [callbackFunction, emitOnce]
  // emit infinitely if second variable in array is true
  return {
    on: (nameOfEmitter, callbackFunction) => {
      if (activeEvents[nameOfEmitter] == null) {
        // is null or undefined
        activeEvents[nameOfEmitter] = {}
      }
      activeEvents[nameOfEmitter][callbackFunction.name] = [
        callbackFunction,
        false
      ]
    },
    off: (nameOfEmitter, callbackFunction) => {
      if (activeEvents[nameOfEmitter][callbackFunction.name] != null) {
        // the emitter exists, i.e. is not null or undefined
        activeEvents[nameOfEmitter][callbackFunction.name] = null
        // null indicates the event was previously on at some point
      }
    },
    once: (nameOfEmitter, callbackFunction) => {
      if (activeEvents[nameOfEmitter] == null) {
        // is null or undefined
        activeEvents[nameOfEmitter] = {}
      }
      activeEvents[nameOfEmitter][callbackFunction.name] = [
        callbackFunction,
        false
      ]
    },
    emit: (nameOfEmitter, functionInput) => {
      debugger
      if (
        // the emitter exists, i.e. is not null or undefined
        activeEvents[nameOfEmitter] != null &&
        typeof activeEvents[nameOfEmitter] === "object"
      ) {
        /*        activeEvents[nameOfEmitter]
          .entries()
          .forEach(([callbackFunction, emitOnce]) => {
            callbackFunction(functionInput)
            if (emitOnce === true) {
              activeEvents[nameOfEmitter][callbackFunction.name] = null
            }
          })*/
      }
    }
  }
}

const responseToEvent = msg => {
  console.log(msg)
} // responseToEvent.name // responseToEvent

/* const responseToEventer = function Separate(msg) {
    console.log(msg);
}  responseToEventer.name // Separate
*/

const eventEmitter = EventEmitter()

// on: call it everytime it emits the vent
eventEmitter.on("pramp", responseToEvent)
// once: call it the first time then stop listening
eventEmitter.once("pramp", function(msg) {
  console.log(msg + " just once!")
})
// emit: run callbacks
eventEmitter.emit("pramp", "1st")
eventEmitter.emit("pramp", "2nd")
// off: remove specified event listener
eventEmitter.off("pramp", responseToEvent)
eventEmitter.emit("pramp", "3rd")
eventEmitter.emit("pramp", "1st")
