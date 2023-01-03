import { Kafka, Partitioners } from 'kafkajs'

const createNewEntryClient = (topicName) => {
    const kafkaEntryClient = new Kafka({
        clientId: `${topicName}-PerfTesterEntry-${crypto.randomUUID()}`,
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

    return kafkaExitClient.consumer({ groupId: `NUA-PerfTesters-${crypto.randomUUID()}` })
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