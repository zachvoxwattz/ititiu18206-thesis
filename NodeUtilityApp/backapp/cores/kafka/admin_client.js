import DOTENV from 'dotenv'
import { v4 as uuidv4 } from 'uuid'
import { Kafka } from 'kafkajs'

DOTENV.config()
const appBrokers = JSON.parse(process.env.BROKER_LIST)

const getNewInstance = (inputClientId, inputBrokers, inputTOut) => {
    let clientid, brokers, tOut, kafkaInstance
    
    inputClientId ? clientid = inputClientId : clientid = `NUAAC-${uuidv4()}` // Node Utility App Admin Client
    inputBrokers ? brokers = inputBrokers : brokers = appBrokers
    inputTOut ? tOut = inputTOut : tOut = 3000

    kafkaInstance = new Kafka({clientId: clientid, brokers: brokers, connectionTimeout: tOut})
    return kafkaInstance.admin()
}

export { getNewInstance }
