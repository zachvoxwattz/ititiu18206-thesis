import DOTENV from 'dotenv'
import { Kafka } from 'kafkajs'

DOTENV.config()
const brokers = JSON.parse(process.env.BROKER_LIST)

const kafka = new Kafka({
    clientId: "Node Event Replay Kafka Admin Client",
    brokers: brokers,
    connectionTimeout: 5000
})

const adminClient = kafka.admin()

const getTopics = async () => {
    let returnData
    try {
        connect().catch(() => {})
        returnData = await adminClient.listTopics()
        disconnect()
    }
    catch (error) {
        returnData = {
            error: true,
            message: "Error while trying to get topics from cluster.\nPlease contact the author for information!"
        }
    }
    return returnData
}

const connect = async () => {
    await adminClient.connect()
}

const disconnect = async () => {
    await adminClient.disconnect()
}

export { getTopics, disconnect }
