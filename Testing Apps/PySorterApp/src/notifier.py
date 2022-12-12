import json
from kafka import KafkaProducer

class ResultNotifier:
    def __init__(self, broker_list, output_topic):

        self.outputTopic = output_topic
        self.client = KafkaProducer(
            bootstrap_servers = broker_list,
            key_serializer = lambda key: json.dumps(key).encode('utf-8'),
            value_serializer = lambda value: json.dumps(value).encode('utf-8')
        )

    def emitMessage(self, datagram, sorted_array, done_time):
        # No need to serialize data here as we have defined it on the __init__ method
        datagram['sortedArray'] = sorted_array
        datagram['doneTime'] = done_time
        eventKey = datagram['eventMessageID']

        self.client.send(topic = self.outputTopic, key = eventKey, value = datagram)
        self.client.flush()
        