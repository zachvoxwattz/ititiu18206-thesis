import json
import src.sorter as sorter
import src.multithreading as mThrd
from kafka import KafkaConsumer

broker = ['Iris:9091', 'Iris:9092']

class DataReceiver:
    def __init__(self, notifier):
        self.kafkaClient = KafkaConsumer(bootstrap_servers=broker, client_id='PySorterApp Listener')
        self.notifier = notifier

    def subscribeTopic(self, topicName):
        self.kafkaClient.subscribe(topics=topicName)

    def acceptRequests(self, shouldPrintInfo: bool):
        for data in self.kafkaClient:

            # This line converts literal bytes to JSON. After that, accessing them normally like many other Python apps
            # -----------------------
            processedData = json.loads(data.value)
            if shouldPrintInfo:
                print('\n\nNew message! Detailed Datagram: %s' % (processedData))

            # Gives the SortThread data to execute request right away.
            mThrd.SortThread(processedData, sorter = sorter.BubbleSorter(), notifier = self.notifier).execute()