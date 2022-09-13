import { Kafka } from 'kafkajs'

const brkr1 = '192.168.100.17:9091'

const kafka = new Kafka({
    clientId: "HCMIU Course Registerer",
    brokers: [brkr1]
})


const executeRegistry = async (data) => {
    let eventProducer = kafka.producer()
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

export { executeRegistry }