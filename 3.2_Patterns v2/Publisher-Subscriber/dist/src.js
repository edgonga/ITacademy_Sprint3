"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Publisher_1 = require("./Publisher");
const Subscriber_1 = require("./Subscriber");
const AshKetchup = new Publisher_1.Publisher("Pokemon Biology", "Ash Ketchup");
AshKetchup.connectToMoodle().then(() => {
    AshKetchup.publishHomework("Pikachu is a mouse");
    AshKetchup.publishHomework("Charmander don't like water");
}).finally(() => {
    AshKetchup.disconnect();
});
const ProfessorOak = new Subscriber_1.Subscriber("Pokemon Biology", "Professor Oak");
ProfessorOak.connectToMoodle().then(() => {
    ProfessorOak.reviewingNews();
});
