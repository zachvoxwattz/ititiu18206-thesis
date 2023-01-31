import dotenv from 'dotenv'
import { Kafka, Partitioners } from 'kafkajs'

dotenv.config()
const brokers = JSON.parse(process.env.BROKER_LIST)

const kafka = new Kafka({
    clientId: "Node Data Pusher App",
    brokers: brokers
})

const sendMessage = async (datagram, topicName) => {
  let eventProducer = kafka.producer({createPartitioner: Partitioners.LegacyPartitioner})
  await eventProducer.connect()

  await eventProducer.send({
    topic: topicName,
    messages: [ 
      {
        key: `NDA-${crypto.randomUUID()}`, 
        value: JSON.stringify(datagram)
      } 
    ]
  })

  await eventProducer.disconnect()
}

export { sendMessage, kafka }
