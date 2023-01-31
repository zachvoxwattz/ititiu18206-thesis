import json
import uuid
from kafka import KafkaProducer

class ResultNotifier:
    def __init__(self, broker_list, output_topic):

        self.outputTopic = output_topic
        self.client = KafkaProducer(
            bootstrap_servers = broker_list,
            key_serializer = lambda key: json.dumps(key).encode('utf-8'),
            value_serializer = lambda value: json.dumps(value).encode('utf-8')
        )

    def emitMessage(self, value, key, sorted_array, start_time, end_time):
        # No need to serialize data here as we have defined it on the __init__ method
        value['processedArray'] = sorted_array
        value['startTime'] = start_time
        value['endTime'] = end_time
        
        self.client.send(topic = self.outputTopic, key = key, value = value)
        self.client.flush()
                
    def emitErrorMessage(self):
        datagram = {'error': True}
        errorKey = self.outputTopic + '-[TEST_FAILED-' + str(uuid.uuid4()) + ']'

        self.client.send(topic = self.outputTopic, key = errorKey, value = datagram)
        self.client.flush()
        