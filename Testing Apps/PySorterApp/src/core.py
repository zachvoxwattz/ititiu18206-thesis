from src.notifier import ResultNotifier
from src.receiver import DataReceiver

class PythonSortApp:
    def __init__(self, doDebug, broker_list: list, input_topic, output_topic):
        self.debugMode = doDebug
        self.brokerList = broker_list
        self.inputTopic = input_topic
        self.outputTopic = output_topic

        self.messageReceiver = DataReceiver(
            notifier = ResultNotifier(
                broker_list = self.brokerList,
                output_topic = self.outputTopic
            ),
            broker_list = self.brokerList,
            input_topic = self.inputTopic,
            output_topic = self.outputTopic,
            debugEnabled = self.debugMode
        )

    def execute(self):
        self.messageReceiver.acceptRequests()
