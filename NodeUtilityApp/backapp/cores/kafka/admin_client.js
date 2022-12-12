import DOTENV from 'dotenv'
import { Kafka } from 'kafkajs'

DOTENV.config()
const appBrokers = JSON.parse(process.env.BROKER_LIST)

const getNewInstance = (inputClientId, inputBrokers, inputTOut) => {
    let clientid, brokers, tOut, kafkaInstance
    
    inputClientId ? clientid = inputClientId : clientid = 'Node Event Replay Kafka Admin Client'
    inputBrokers ? brokers = inputBrokers : brokers = appBrokers
    inputTOut ? tOut = inputTOut : tOut = 3000 

    kafkaInstance = new Kafka({clientId: clientid, brokers: brokers, connectionTimeout: tOut})
    return kafkaInstance.admin()
}

export { getNewInstance }
