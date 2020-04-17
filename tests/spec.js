// Run test suite with: yarn mocha tests/*

const expect = require("chai").expect
require("mocha-sinon")

const { EventEmitter } = require("../src/EventEmitter")

const responseToEvent = (msg) => {
  console.log(msg)
}

const eventEmitter = EventEmitter()

describe("EventEmitter()", function () {
  beforeEach(function () {
    this.sinon.spy(console, "log")
  })

  before(function () {
    // on: call it everytime it emits the vent
    eventEmitter.on("pramp", responseToEvent)
    // once: call it the first time then stop listening
    eventEmitter.once("pramp", function (msg) {
      console.log(msg + " just once!")
    })
  })

  it("should run active callbacks 1st and 1st just once!", function () {
    // emit: run callbacks
    eventEmitter.emit("pramp", "1st")

    expect(console.log.calledWith("1st")).to.be.true
    expect(console.log.calledWith("1st just once!")).to.be.true
  })

  it("should run active callbacks 2nd without 2nd just once!", function () {
    // emit: run callbacks
    eventEmitter.emit("pramp", "2nd")

    expect(console.log.calledOnceWithExactly("2nd")).to.be.true
  })

  it("should run no callbacks after the callback is turned off", function () {
    // off: remove specified event listener
    eventEmitter.off("pramp", responseToEvent)
    eventEmitter.emit("pramp", "3rd")
    eventEmitter.emit("pramp", "1st")
    expect(console.log.notCalled).to.be.true
  })
})
