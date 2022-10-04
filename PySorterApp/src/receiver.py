from kafka import KafkaConsumer
import json
import src.sorter as sorter
import src.threaded_sortcenter as mThrd

class DataReceiver:
    def __init__(self, notifier, broker_list, topic: str = None, debugEnabled = True):
        self.kafkaClient = KafkaConsumer(bootstrap_servers = broker_list, client_id = 'PySorterApp Listener')
        self.notifier = notifier
        self.shouldPrintInfo = debugEnabled
        self.subbedTopic = None

        if topic is None:
            pass
        else:
            self.subbedTopic = topic
            self.subscribeTopic(topic)


    def subscribeTopic(self, topicName):
        self.subbedTopic = topicName
        self.kafkaClient.subscribe(topics = topicName)

    def acceptRequests(self):

        if self.subbedTopic is None:
            print("App isn't subscribed to any topic! Exiting...")
            return
        else:
            print("App subscribed topic name '%s'. Running..." % self.subbedTopic)

        for data in self.kafkaClient:

            # This line converts literal bytes to JSON. After that, accessing them normally like many other Python apps
            # -----------------------
            processedData = json.loads(data.value)
            if self.shouldPrintInfo:
                print('\n\nNew message! Detailed Datagram: %s' % (processedData))

            # Gives the SortThread data to execute request right away.
            mThrd.SortThread(processedData, sorter = sorter.BubbleSorter(), notifier = self.notifier).execute()
            