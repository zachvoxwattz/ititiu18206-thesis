import DOTENV from 'dotenv'
import { KafkaStreams } from "kafka-streams"
import configurations from '../misc/cfg.json' assert {type: 'json'}

DOTENV.config()

const kafkaStreams = new KafkaStreams(configurations)
kafkaStreams.on('error', (err) => { console.log(err) })

const topic1 = process.env.TOPIC1

const streamTopic1 = kafkaStreams.getKStream(topic1)
streamTopic1.forEach(msg => {
    console.log('\n------NEW MESSAGE------')
    console.log(`Key:\t${msg.key.toString()}`)
    console.log(`Offset:\t${msg.offset.toString()}`)
    console.log(`Partition: ${msg.partition.toString()}`)
    console.log(`Topic:\t${msg.topic.toString()}`)
    console.log(`Value:\t${msg.value.toString()}`)
    console.log('------END MESSAGE------\n')
})

const startApp = () => {
    streamTopic1.start().then(() => {
        console.log('Stream 1 started without errors...')
    }, err => {
        console.log(`Stream 1 started with error(s):\n\t${err}`)
    })
}

export { startApp }
