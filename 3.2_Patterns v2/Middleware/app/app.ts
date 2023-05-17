import * as fs from 'fs'
import path from 'path'
import { MathMiddleware } from './MathsMiddleware'
import express, { Request, Response, NextFunction } from 'express'

const app = express()

export function sum(a: number, b: number): number {
    return a + b
}

export function multiply(a: number, b: number): number {
    return a * b
}

export function divide(a: number, b: number): number {
    return a / b
}

const jsonInput = fs.readFileSync(path.join(__dirname, "./data.json"), "utf8")
const inputs = JSON.parse(jsonInput)
const input1 = inputs.num1
const input2 = inputs.num2
const middleware = new MathMiddleware(input1, input2)

app.use((req: Request, res: Response, next: NextFunction) => {
    const outputSum = sum(input1, input2)
    const outputMult = multiply(input1, input2)
    const outputDiv = divide(input1, input2)

    res.locals.outputSum = outputSum
    res.locals.outputMult = outputMult
    res.locals.outputDiv = outputDiv
    next()
})

app.use((req: Request, res: Response, next: NextFunction) => {
    middleware.squareMiddleware()
    middleware.divideByTwoMiddleware()
    middleware.cubeMiddleware()
    next()
})

app.get('/', (req: Request, res: Response) => {
    const { outputSum, outputMult, outputDiv } = res.locals
    
    const roundedSum = outputSum.toFixed(2);
    const roundedMult = outputMult.toFixed(2);
    const roundedDiv = outputDiv.toFixed(2);
    
    const tableData = {
        "Sum value": roundedSum,
        "Multiplication value": roundedMult,
        "Divison value": roundedDiv
    }
    console.table(tableData)
    res.send("The end")  
})

const server = app.listen(3000, () => {
    console.log("------> Server initialized on port 3000 <------")
    console.log("If not request is done, Port 3000 will be closed in 5 seconds")
    setTimeout(() => {
        server.close(() => {
            console.log("Server closed");
        })
    }, 5000)
    
})
