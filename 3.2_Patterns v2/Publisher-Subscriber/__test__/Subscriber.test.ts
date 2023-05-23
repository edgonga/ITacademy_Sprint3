import { test } from "node:test"
import { Subscriber } from "../src/Subscriber"


test("ests that the class can connect to RabbitMQ server successfully", async () => {
    const subscriber = new Subscriber("testQueue", "testTeacher")
    await expect(subscriber.connectToMoodle()).resolves.not.toThrow()
    await subscriber.disconnect()
})


test("tests that the class can disconnect from RabbitMQ server successfully and delete the queue", async () => {
    const subscriber = new Subscriber("testQueue", "testTeacher")
    await subscriber.connectToMoodle()
    await expect(subscriber.disconnect()).resolves.not.toThrow()
})

