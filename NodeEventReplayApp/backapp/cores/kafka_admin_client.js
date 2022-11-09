import DOTENV from 'dotenv'
import { Kafka } from 'kafkajs'

DOTENV.config()
const brokers = JSON.parse(process.env.BROKER_LIST)

const kafka = new Kafka({
    clientId: "Node Event Replay Kafka Admin Client",
    brokers: brokers
})

const adminClient = kafka.admin()

const getTopics = async () => {
    await adminClient.connect()
    let topicArray = await adminClient.listTopics()
    return topicArray
}

const disconnect = async () => {
    await adminClient.disconnect()
}

export { getTopics, disconnect }
