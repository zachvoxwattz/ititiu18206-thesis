import json
from kafka import KafkaProducer

broker = ['Iris:9091', 'Iris:9092']
subbedTopic = 'tbSortedResults'

class KafKaNotifier:
    def __init__(self):
        self.client = KafkaProducer(
            bootstrap_servers=broker, 
            value_serializer = lambda data: json.dumps(data).encode('utf-8')
        )

    def emitMessage(self, datagram):
        self.client.send(topic = subbedTopic, value = datagram)