import src.notifier as noti
import src.receiver as recv

class PythonSortApp:
    def __init__(self, doDebug, broker_list, input_topic, output_topic):
        self.debugMode = doDebug
        self.brokerList = broker_list
        self.inputTopic = input_topic
        self.outputTopic = output_topic

        self.messageNotifier = noti.KafKaNotifier(
            broker_list = self.brokerList, 
            output_topic = self.outputTopic
        )
        
        self.messageReceiver = recv.DataReceiver(
            notifier = self.messageNotifier, 
            broker_list = self.brokerList, 
            debugEnabled = self.debugMode, 
            topic = input_topic
        )

    def execute(self):
        self.messageReceiver.acceptRequests()
