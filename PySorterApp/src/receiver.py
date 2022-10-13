import json
from kafka import KafkaConsumer
from multiprocessing import Pipe
from src.sorter import BubbleSorter, InsertionSorter, SelectionSorter, ShellSorter
from src.sort_thread import SortThread

class DataReceiver:
    def __init__(self, notifier, broker_list: list, input_topic, output_topic, debugEnabled):
        self.resultNotifier = notifier
        self.brokerList = broker_list
        self.kafkaClient = KafkaConsumer(bootstrap_servers = broker_list, client_id = 'PySorterApp Listener')
        self.debugMode = debugEnabled
        self.inputSubbedTopic = input_topic
        self.outputSubbedTopic = output_topic
        self.kafkaClient.subscribe(topics = self.inputSubbedTopic)

    def acceptRequests(self):
        print("App subscribed topic name '%s'. Running..." % self.inputSubbedTopic)

        for data in self.kafkaClient:

            # This line converts literal bytes to JSON. After that, accessing them normally like many other Python apps
            # -----------------------
            processedData = json.loads(data.value)
            if self.debugMode:
                print('\n\nNew message! Detailed Datagram: \n%s' % (processedData))

            # Gives the SortThread data to execute request right away.
            SortThread(
                processedData, 
                sorter = ShellSorter(), 
                notifier = self.resultNotifier, 
                debugMode = self.debugMode
            ).execute()
