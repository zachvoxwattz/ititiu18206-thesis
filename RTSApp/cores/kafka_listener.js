import { Kafka } from 'kafkajs'

const brkr1 = '192.168.100.17:9091'

const kafka = new Kafka({
    clientId: "HCMIU Course Registerer",
    brokers: [brkr1]
})


const topic = 'test'
const consumer = kafka.consumer({ groupId: 'test-group' })

const run = async () => {
    await consumer.connect()
    await consumer.subscribe({ topic, fromBeginning: true })
    await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
            console.log(`- ${prefix} ${message.key}#${message.value}`)
        },
    })
}

run().catch(e => console.error(`[example/consumer] ${e.message}`, e))
