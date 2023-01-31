import json
import re

class ENVV:
    def __init__(self, brokerArray, inputSubbedTopic, outputSubbedTopic):
        self.validateBrokers(brokerArray)
        self.validateTopics(inputSubbedTopic, outputSubbedTopic)
        return

    def dummy(self):
        pass

    def validateBrokers(self, brokerArray):
        jsonizedArr = json.loads(brokerArray)
        if len(jsonizedArr) == 0:
            print('No brokers provided! Exiting ...')
            quit()

        RegExPattern = '[a-zA-Z0-9.]+:[0-9]+'

        for item in jsonizedArr:
            result = re.search(RegExPattern, item)
            if not result:
                print('One or more broker info have invalid formats! Exiting ...')
                quit()

        return

    def validateTopics(self, inTopic, outTopic):
        if inTopic == '' or inTopic == None:
            print('No intake topic provided! Exiting ...')
            quit()

        if outTopic == '' or outTopic == None:
            print('No outgoing topic provided! Exiting ...')
            quit()
        return
