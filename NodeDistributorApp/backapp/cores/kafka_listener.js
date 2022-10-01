import { Kafka } from 'kafkajs'

const brkr1 = 'Iris:9091'

const kafka = new Kafka({
    clientId: "Sorter Listener",
    brokers: [brkr1]
})

const shouldPrintInfo = false
const topic = 'tbSorted'
const consumer = kafka.consumer({groupId: 'kafka-group'})

const run = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic, fromBeginning: false })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {

            let receivedData = JSON.parse(message.value)
            shouldPrintInfo ? printInfo(receivedData, topic, partition) : {}

            
        },
    })
}

const printInfo = (datagram, topic, partition) => {
    console.log(`\n- Received message from broker!\nSample array value: ${datagram.sampleArray}`)
    console.log(`Data sent @ timestamp: ${datagram.startedTime}`)
    console.log(`\nThis message is a part of topic '${topic}', located in partition #${partition}`)
}

run().catch(e => console.error(`[example/consumer] ${e.message}`, e))
