import { User } from "./user"
import { Topic } from "./topic"

const cybercrime = new Topic("Cybercrime")
cybercrime.subscribeUser("Oliver")
// New user "Oliver" should have been created

const oldCars = new Topic ("Old Cars")
const McGregor = new User("McGregor")
oldCars.subscribeUser(McGregor)
oldCars.subscribeUser("Mr Fisher")
oldCars.subscribeUser("Logan")

const logan = oldCars.getUser("Logan")
const fisher = oldCars.getUser("Mr Fisher")
oldCars.postMessage("I really like british cars", McGregor)
oldCars.postMessage("British cars are shit, dickhead", logan)
oldCars.postMessage("Logan, you are a piece of shit", McGregor)
oldCars.postMessage("Bikes are better than cars motherfuckers!!", fisher)



