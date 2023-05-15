import * as fs from 'fs'
import path from 'path'
import { MathMiddleware } from './maths'
import express, { Request, Response, NextFunction } from 'express'

const app = express()

const sum = (a: number, b: number): number => {
    return a + b
}

const multiply = (a: number, b: number): number => {
    return a * b
}

const divide = (a: number, b: number): number => {
    return a / b
}

// const operate = (num1: number, num2: number, operation: (param1: number, param2: number) => number): number => {
//     const middleware = new MathMiddleware(input1, input2)
//     app.use(middleware.squareMiddleware)
//     app.use(middleware.divideByTwoMiddleware)
//     app.use(middleware.cubeMiddleware)
//     return operation(num1, num2)
// }

app.use((req: Request, res: Response, next: NextFunction) => {
    const jsonInput = fs.readFileSync(path.join(__dirname, "./data.json"), "utf8")
    const inputs = JSON.parse(jsonInput)
    const input1 = inputs.num1
    const input2 = inputs.num2

    const middleware = new MathMiddleware(input1, input2)
    middleware.squareMiddleware
    middleware.divideByTwoMiddleware
    middleware.cubeMiddleware
    
    const outputSum = sum(input1, input2)
    const outputMult = multiply(input1, input2)
    const outputDiv = divide(input1, input2)

    res.locals.outputSum = outputSum
    res.locals.outputMult = outputMult
    res.locals.outputDiv = outputDiv

    next()
})

app.get('/', (req: Request, res: Response) => {
    const { outputSum, outputMult, outputDiv } = res.locals
    
    const tableData = {
        "Sum value": outputSum,
        "Multiplication value": outputMult,
        "Divison value": outputDiv
    }
    console.table(tableData)
    res.send("The end")
})

app.listen(3000, () => {
    console.log("Server initialized on port 3000");
})


