import src.notifier as noti
import src.receiver as recv

class PythonSortApp:
    def __init__(self, doDebug, broker_domain, broker_ports, input_topic, output_topic):
        self.debugMode = doDebug
        self.broker_domain = broker_domain
        self.broker_ports = broker_ports
        self.inputTopic = input_topic
        self.outputTopic = output_topic

        self.messageNotifier = noti.KafKaNotifier(output_topic = self.outputTopic)
        self.messageReceiver = recv.DataReceiver(notifier = self.messageNotifier, debugEnabled = self.debugMode, topic = input_topic)