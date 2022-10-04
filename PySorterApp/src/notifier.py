import json
from kafka import KafkaProducer

broker = ['Iris:9091', 'Iris:9092']
subbedTopic = 'tbSortedResults'

class KafKaNotifier:
    def __init__(self, output_topic):
        self.outputTopic = output_topic
        self.client = KafkaProducer(
            bootstrap_servers = broker, 
            value_serializer = lambda data: json.dumps(data).encode('utf-8')
        )

    def emitMessage(self, datagram):
        # No need to serialize data here as we have defined it on the __init__ method
        self.client.send(topic = self.outputTopic, value = datagram)