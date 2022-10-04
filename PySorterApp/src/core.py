import src.notifier as noti
import src.receiver as recv

class PythonSortApp:
    def __init__(self, doDebug, broker_domain, broker_ports, input_topic, output_topic):
        self.debugMode = doDebug
        self.broker_domain = broker_domain
        self.broker_ports = broker_ports
        self.inputTopic = input_topic
        self.outputTopic = output_topic

        self.broker_list = []
        for itor in broker_ports:
            broker = "%s:%d" % (self.broker_domain, itor)
            self.broker_list.append(broker)

        self.messageNotifier = noti.KafKaNotifier(broker_list = self.broker_list, output_topic = self.outputTopic)
        self.messageReceiver = recv.DataReceiver(notifier = self.messageNotifier, broker_list = self.broker_list, debugEnabled = self.debugMode, topic = input_topic)

    def execute(self):
        self.messageReceiver.acceptRequests()
