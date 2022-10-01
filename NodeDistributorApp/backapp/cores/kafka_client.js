import { Kafka, Partitioners } from 'kafkajs'

const brkr1 = 'Iris:9091'

const kafka = new Kafka({
    clientId: "Node Data Pusher App",
    brokers: [brkr1]
})


const executeRegistry = async (data) => {
    let eventProducer = kafka.producer({createPartitioner: Partitioners.LegacyPartitioner})
    await eventProducer.connect()

    await eventProducer.send({
        topic: 'test',
        messages: [
          { value: data.courseID }, 
          { value: data.courseName }
        ],
      })

    await eventProducer.disconnect()
}

const sendMessage = async (datagram, topicName) => {
  let eventProducer = kafka.producer({createPartitioner: Partitioners.LegacyPartitioner})
  await eventProducer.connect()

  await eventProducer.send({
    topic: topicName,
    messages: [ {value: JSON.stringify(datagram)} ]
  })

  await eventProducer.disconnect()
}

export { executeRegistry, sendMessage, kafka }