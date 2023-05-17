import * as fs from 'fs'
import path from 'path'

const jsonInput = fs.readFileSync(path.join(__dirname, "./currency_conversions.json"), "utf8")
const inputs = JSON.parse(jsonInput)

export interface CashConverter {
    convert(currency: string, amount: number): void
    conversionInit(): void 
}

export class EuroTrader implements CashConverter {
    
    public item: string
    public currency: string

    constructor(item: string) {
        this.item = item
        this.currency = ""
    }
    conversionInit(): void {
        console.log(`--------- A ${this.currency}-EURO conversion is going to take place ---------`)
        
    }
    convert(currency: string, amount: number) {
        this.currency = currency.toUpperCase()
        this.conversionInit()
        switch(this.currency) {
            case "USD":
                const outputUSD: number = amount * inputs.USD_EUR
                console.log(`
                The value of the ${this.item} is ${outputUSD.toFixed(2)}€
                `)
                break
                 
            case "GBP":
                const outputGBP: number = amount * inputs.GBP_EUR
                console.log(`
                The value of the ${this.item} is ${outputGBP.toFixed(2)}€
                `)
                break

            case "CHF":
                const outputCHF: number = amount * inputs.CHF_EUR
                console.log(`
                The value of the ${this.item} is ${outputCHF.toFixed(2)}€
                `)
                break

            case "JPY":  
                const outputJPY: number = amount * inputs.JPY_EUR
                console.log(`
                The value of the ${this.item} is ${outputJPY.toFixed(2)}€
                `)
                break

            case "CAD":
                const outputCAD: number = amount * inputs.CAD_EUR
                console.log(`
                The value of the ${this.item} is ${outputCAD.toFixed(2)}€
                `)
                break

            case "CNY":
                const outputCNY: number = amount * inputs.CNY_EUR
                console.log(`
                The value of the ${this.item} is ${outputCNY.toFixed(2)}€
                `)
                break

            default:
                console.log("This currency is not supported");
                
        }
    }
}

// const SamsungHDMI = new EuroTrader("Samsung HDMI")
// SamsungHDMI.convert("CNY", 15000)

// const QueenTshirt = new EuroTrader("Queen Tshirt")
// QueenTshirt.convert("cAD", 47)

// const MessageExperience = new EuroTrader("Message experience")
// MessageExperience.convert("jpy", 6609)

// const ZeldaLD = new EuroTrader("Zelda Limited Edition")
// ZeldaLD.convert("CHf", 78)

// const AirJordan = new EuroTrader("Air Jordan nike 365")
// AirJordan.convert("GBP", 184.2)

// const Ak47 = new EuroTrader("AK-47")
// Ak47.convert("usd", 2336)

// const incorrect = new EuroTrader("null")
// incorrect.convert("inco", 455)

module.exports = {
    inputs,
    EuroTrader
}