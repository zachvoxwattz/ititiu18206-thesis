import os
import json
import src.core as appcore
from dotenv import load_dotenv

def checkBrokerInfo(a, b):
    if a == '' or a == None:
        print('Missing broker domain information! Exiting app...')
        quit()

    if b == '' or b == None:
        print('Missing broker port information! Exiting app...')
        quit()
    
    return

if __name__ == '__main__':
    ### Initializes app's ENVs
    load_dotenv()
    
    broker_domain = os.getenv('BROKER_DOMAIN')
    broker_ports = os.getenv('BROKER_PORTS')

    checkBrokerInfo(broker_domain, broker_ports)

    shouldDebug = False if os.getenv('DEBUG_MODE') == 'False' or os.getenv('DEBUG_MODE') == None or os.getenv('DEBUG_MODE') == '' else True
    inputTopic = os.getenv('SUBBED_INPUT_TOPIC')
    outputTopic = os.getenv('SUBBED_OUTPUT_TOPIC')
    
    program = appcore.PythonSortApp(
        doDebug = shouldDebug,
        broker_domain = broker_domain,
        broker_ports = json.loads(broker_ports),
        input_topic = inputTopic,
        output_topic = outputTopic
    )

    program.execute()
