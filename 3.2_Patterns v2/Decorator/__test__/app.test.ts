const { inputs, CashConverter } = require("../app/app")
import { EuroTrader } from '../app/app'
import * as fs from 'fs'

test("the correct data is read from the json", () => {
    expect(inputs.USD_EUR).toBe(0.819908)
})

test("inside the convert's method, the console log is called 2 times", () => {
    const screenHD = new EuroTrader("LG led")
    const timesSpy = jest.spyOn(console, "log")
    screenHD.convert("USD", 100)
    expect(timesSpy).toHaveBeenCalledTimes(2)
})


test("the conversionInit() method logs the correct message", () => {
    const euroTrader = new EuroTrader("Zelda Limited Edition")
    const consoleSpy = jest.spyOn(console, 'log')
    euroTrader.conversionInit()
    expect(consoleSpy).toHaveBeenCalledWith(`--------- A -EURO conversion is going to take place ---------`)
})

test("if a non-existing currency is prompted, the error message is launched", () => {
    const euroTrader = new EuroTrader("Queen Tshirt")
    const consoleSpy = jest.spyOn(console, 'log')
    euroTrader.convert("AUD", 50)
    expect(consoleSpy).toHaveBeenCalledWith("This currency is not supported")
})

