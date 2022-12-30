import { getTimestamp } from "../cores/express/server.js"
import { getTopics } from "../cores/kafka/admin_api.js"
import { createNewEntryClient, createNewExitClient, connectSubscribe, connectOnly, stopAndDisconnect } from '../cores/kafka/procon_client_api.js'

const testPerformanceHandler = async (req, res) => {
    let { entryTopic, exitTopic, testingDataSet } = req.body

    // Check for valid request body and make sure that all required information is valid
    if (!testingDataSet || !entryTopic || !exitTopic) {
        res.status(400).send({ error: true, message: "Invalid argument(s) detected!" })
        return
    }

    // Checks for array type. If not, HTTP 400 is sent
    if (!Array.isArray(testingDataSet)) {
        res.status(400).send({ error: true, message: "Testing data set is not an array of objects!" })
        return
    }
    
    // If its an array, then testing data must not be empty. Otherwise, HTTP 400 is sent
    if (testingDataSet.length === 0) {
        res.status(400).send({ error: true, message: "Testing data set is empty!" })
        return
    }

    // Checks for the topics similarity, then its existence. If they don't, HTTP 400 is sent. If the cluster is down, HTTP 500 is sent.
    if (entryTopic === exitTopic || exitTopic === entryTopic) {
        res.status(400).send({ error: true, message: "Invalid topic(s) detected. Both entry and exit topics are the same!" })
        return
    }
    let recvData = await getTopics()
    if (recvData?.error) {
        res.status(500).send({ error: true, message: "An error occurred on the server side. Please try again later!" })
        return
    }
    else if (!recvData.includes(entryTopic) || !recvData.includes(exitTopic)) {
        res.status(400).send({ error: true, message: "Invalid topic(s) detected. One or more topics do not exist!" })
        return
    } 

    // Checks for the structure of each individual testing data object in the testing data set. 
    // If any of each does not comply to the regulated format,
    // gets all of faulty indexes then send back http 400 with data
    let faultyIndex = []
    for (let i = 0; i < testingDataSet.length; i++) {
        let sample = testingDataSet[i]
        if (!sample?.value) {
            faultyIndex.push(i)
        }
    }
    
    if (faultyIndex.length !== 0) {
        let reportMessage
        let postMessage
        if (faultyIndex.length > 10) {
            let remainingIndexes = faultyIndex.length - 10
            reportMessage = `One or more objects of testing data set do not comply with predefined base structure format!`
            postMessage = 'Invalid index(es): '

            for (let i = 0; i < 10; i++) postMessage += `${faultyIndex[i]}, `
            postMessage += `... and ${remainingIndexes} more.`
        }
        else {
            reportMessage = `One or more objects of testing data set do not comply with predefined base structure format!\nInvalid index(es): ${faultyIndex}`
        }
        res.status(400).send({ error: true, message: reportMessage, postMessage })
        return
    }

    // Stringify all test data and create new array for storing them for processing
    let processedDataSet = []
    testingDataSet.forEach((object, index) => {
        let contempKey = `${entryTopic}-[Test#${index}]`
        let contempValue = object.value
        processedDataSet.push({
            key: contempKey,
            value: JSON.stringify(contempValue)
        })
    })

    // All mandatory tests passed, move on to performance testing...
    testingDataSet.length = 0   // free memory by clearing the testing data set
    let testingResults = await performTest(entryTopic, exitTopic, processedDataSet)
    res.status(200).send(testingResults)
}

const performTest = async (entryTopic, exitTopic, processedDataSet) => {
    return new Promise(async (resolve) => {
        let testCount = 0
        let totalErrorCount = 0
        let testGoal = processedDataSet.length
        let startTimestamp

        let exitKafkaClient = createNewExitClient(exitTopic)
        await connectSubscribe(exitKafkaClient, exitTopic)
        await exitKafkaClient.run({
            eachMessage: async ({message}) => {
                testCount++
                let parsedMessage = JSON.parse(message.value.toString())
                if (parsedMessage?.error) totalErrorCount++
                
                if (testCount === testGoal) {
                    let endTimestamp = getTimestamp()
                    let duration = (endTimestamp - startTimestamp) * 1000
                    let errorCount

                    totalErrorCount === 0 ? errorCount = 'N/A' : errorCount = totalErrorCount
                    stopAndDisconnect(exitKafkaClient)
                    resolve({
                        testStartTime: startTimestamp,
                        testEndTime: endTimestamp,
                        testRuntime: Math.round((duration + Number.EPSILON) * 100) / 100,
                        errorCount
                    })
                }
            }
        })

        let entryKafkaClient = createNewEntryClient(entryTopic)
        await connectOnly(entryKafkaClient)

        startTimestamp = getTimestamp()
        await entryKafkaClient.send({
            topic: entryTopic,
            messages: processedDataSet
        })
        await entryKafkaClient.disconnect()
    })
}

export { testPerformanceHandler }
