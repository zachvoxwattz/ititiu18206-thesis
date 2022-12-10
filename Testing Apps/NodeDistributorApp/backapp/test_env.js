import dotenv from 'dotenv'

dotenv.config()

// Test ENVs down here!
console.log(JSON.parse(process.env.BROKER_LIST))