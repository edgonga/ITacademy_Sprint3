import { User } from "./user"
import { Topic } from "./topic"

const oliver = new User("Oliver")
const cybercrime = new Topic("Cybercrime")
cybercrime.subscribeUser(oliver)


const mcGregor = new User("McGregor")
const logan = new User("Logan")
const fisher = new User("Fisher")
const oldCars = new Topic ("Old Cars")
oldCars.subscribeUser(mcGregor)

oldCars.subscribeUser(logan)


oldCars.postMessage("I really like british cars", mcGregor)
oldCars.subscribeUser(fisher)
oldCars.postMessage("British cars are shit, dickhead", logan)
oldCars.subscribeUser(oliver)
oldCars.postMessage("Logan, you are a piece of shit", mcGregor)
oldCars.postMessage("Bikes are better than cars motherfuckers!!", fisher)

