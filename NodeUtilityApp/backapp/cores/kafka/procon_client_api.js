import { Kafka, Partitioners } from 'kafkajs'
import { v4 as uuidv4 } from 'uuid'

const createNewEntryClient = (topicName) => {
    const kafkaEntryClient = new Kafka({
        clientId: `${topicName}-PerfTester-Entry`,
        brokers: JSON.parse(process.env.BROKER_LIST),
    })

    return kafkaEntryClient.producer({ 
        createPartitioner: Partitioners.LegacyPartitioner, 
        allowAutoTopicCreation: false 
    })
}

const createNewExitClient = (topicName) => {
    const kafkaExitClient = new Kafka({
        clientId: `${topicName}-PerfTester-Exit`,
        brokers: JSON.parse(process.env.BROKER_LIST),
    })

    return kafkaExitClient.consumer({ groupId: `NUA-PerfTesters-${uuidv4()}` })
}

const connectSubscribe = async (targetClient, targetTopic) => {
    await targetClient.connect()
    await targetClient.subscribe({ topic: targetTopic })
}

const connectOnly = async (targetClient) => {
    await targetClient.connect()
}

const stopAndDisconnect = (targetClient) => {
    targetClient.stop()
    targetClient.disconnect()
}

export { createNewEntryClient, createNewExitClient, connectSubscribe, connectOnly, stopAndDisconnect }