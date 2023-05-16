import express, { Request, Response, NextFunction } from 'express'

export class MathMiddleware {

    public num1: number
    public num2: number

    constructor(num1: number, num2: number) {
        this.num1 = num1
        this.num2 = num2
    }

    public squareMiddleware() {
        console.log(`Calculating square of ${this.num1.toFixed(2)} and ${this.num2.toFixed(2)}`)

        this.num1 *= this.num1
        this.num2 *= this.num2

        console.log(`THE SQUARES ARE: ${this.num1.toFixed(2)} and ${this.num2.toFixed(2)}`);
    }

    public divideByTwoMiddleware() {
        console.log(`Dividing ${this.num1.toFixed(2)} and ${this.num2.toFixed(2)} by 2`)

        this.num1 = this.num1 / 2
        this.num2 = this.num2 / 2

        console.log(`THE DIVISIONS BY 2 ARE: ${this.num1.toFixed(2)} and ${this.num2.toFixed(2)}`)
    }

    public cubeMiddleware() {
        console.log(`Calculating cube of ${this.num1.toFixed(2)} and ${this.num2.toFixed(2)}`)

        this.num1 *= this.num1 * this.num1;
        this.num2 *= this.num2 * this.num2;

        console.log(`THE CUBES ARE: ${this.num1.toFixed(2)} and ${this.num2.toFixed(2)}`)
    }

}

