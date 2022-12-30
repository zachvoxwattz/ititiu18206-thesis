import dotenv from 'dotenv'
import { Kafka, Partitioners } from 'kafkajs'
import { v4 as uuidv4 } from 'uuid'

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
        key: `NDA-${uuidv4()}`, 
        value: JSON.stringify(datagram)
      } 
    ]
  })

  await eventProducer.disconnect()
}

export { sendMessage, kafka }
