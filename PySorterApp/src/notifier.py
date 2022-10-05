import json
from kafka import KafkaProducer

class KafKaNotifier:
    def __init__(self, broker_list, output_topic):
        self.outputTopic = output_topic
        self.client = KafkaProducer(
            bootstrap_servers = broker_list, 
            value_serializer = lambda data: json.dumps(data).encode('utf-8')
        )

    def emitMessage(self, datagram, sorted_array, done_time):
        # No need to serialize data here as we have defined it on the __init__ method
        datagram['sortedArray'] = sorted_array
        datagram['doneTime'] = done_time
        self.client.send(topic = self.outputTopic, value = datagram)
        