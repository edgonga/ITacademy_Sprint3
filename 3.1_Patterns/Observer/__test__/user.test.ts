// const { User } = require("../app/user")

// test("creates an user properly", () => {
//     const user = new User("Paco")
//     expect(user.getProperties().name).toBe("Paco")
// })

// test("Tests that multiple User instances have unique ids", () => {
//     const user1 = new User("John")
//     const user2 = new User("Jane")
//     expect(user1.getProperties().id).not.toBe(user2.getProperties().id)
// })



const { Topic } = require("../app/topic")
const { User } = require("../app/user")

test("does not add twice the same User", () => {
    const topicTest = new Topic("Test Topic")
    const userTest = new User("Test User")
    topicTest.subscribeUser(userTest)
    topicTest.subscribeUser(userTest)
    expect(topicTest.getProperties().user.size).toBe(1)
})

     
test("Tests that an error is thrown when trying to get a non-existing user from a topic", () => {
    const topicVoid = new Topic("test topic")
    expect(() => {
        topicVoid.getUser("non-existing user")
    }).toThrow("User not found")
})

test("Tests that an unsubscribed user cannot post a message to a topic", () => {
    const topicUnsubscribed = new Topic("test topic")
    const userUnsubscribed = new User("test user")
    expect(() => {
        topicUnsubscribed.postMessage("test message", userUnsubscribed)
    }).toThrow("To add a message, the user needs to be subscribed first to the topic")
})

test("Tests that a subscribed user can post a message to a topic and the message is emitted to other subscribed users", () => {
    const topicEmitter = new Topic("test Topic")
    const user1 = new User("Ezequiel")
    const user2 = new User("Legolas")
    topicEmitter.subscribeUser(user1)
    topicEmitter.subscribeUser(user2)
    const message = "www.google.cat"
    topicEmitter.postMessage(message, user1)
    expect(topicEmitter.getProperties().message).toContain(message)
})

test("A User cannot be subscribed twice to a same topic", () => {
    const topicTwice = new Topic("Pesca")
    const fisherman = new User("Rafa")
    topicTwice.subscribeUser(fisherman)
    expect(() => {
        topicTwice.subscribeUser(fisherman)
    }).toThrow(`You are adding a user who is already subscribed`)
})