"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Publisher = void 0;
const amqp = __importStar(require("amqplib"));
class Publisher {
    constructor(queueName, studentName) {
        this.queueName = queueName;
        this.studentName = studentName;
    }
    getProperties() {
        return {
            queue: this.queueName,
            student: this.studentName,
            connection: this.connection,
            channel: this.channel
        };
    }
    connectToMoodle() {
        return __awaiter(this, void 0, void 0, function* () {
            let attempts = 3;
            while (attempts > 0) {
                try {
                    const amqpUrl = process.env.AMQP_URL || 'amqp://localhost';
                    this.connection = yield amqp.connect(amqpUrl);
                    this.channel = yield this.connection.createChannel();
                    yield this.channel.assertQueue(this.queueName, { durable: false });
                    return;
                }
                catch (err) {
                    console.error(`Failed to connect`);
                    attempts--;
                    const delay = Math.pow(2, 3 - attempts) * 1000;
                    yield new Promise(resolve => setTimeout(resolve, delay));
                }
            }
            throw new Error('Failed to connect to the queue after multiple attepmts');
        });
    }
    logHomeworkPublished(homework) {
        console.log(`The student ${this.studentName} has published the sprint ${this.queueName} with the following content: 
        ${homework}`);
    }
    publishHomework(homework) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                this.channel.sendToQueue(this.queueName, Buffer.from(homework));
                this.logHomeworkPublished(homework);
            }
            catch (err) {
                console.error(`Failed to publish the homework to the queue ${this.queueName}`);
            }
        });
    }
    disconnect() {
        return __awaiter(this, void 0, void 0, function* () {
            yield Promise.all([
                this.channel.close(),
                this.connection.close()
            ]);
        });
    }
}
exports.Publisher = Publisher;
