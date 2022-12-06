import DOTENV from 'dotenv'
import { KafkaStreams } from 'kafka-streams'
import configurations from '../misc/cfg.json' assert { type: 'json' }

DOTENV.config()

const getNewKStreamInstance = () => {
    return new KafkaStreams(configurations)
}

const getTopicKStream = (KStreamInstance, topic) => {
    return KStreamInstance.getKStream(topic)
}
