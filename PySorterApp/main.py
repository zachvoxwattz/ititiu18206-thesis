import re
import os
import json
from src.env_validator import ENVV
from src.core import PythonSortApp
from dotenv import load_dotenv

if __name__ == '__main__':
    ### Initializes app's ENVs
    load_dotenv()

    shouldDebug = False if os.getenv('DEBUG_MODE') == 'False' or os.getenv('DEBUG_MODE') == None or os.getenv('DEBUG_MODE') == '' else True    
    broker_list = os.getenv('BROKER_LIST')
    inputTopic = os.getenv('SUBBED_INPUT_TOPIC')
    outputTopic = os.getenv('SUBBED_OUTPUT_TOPIC')

    ENVV(brokerArray = broker_list, inputSubbedTopic = inputTopic, outputSubbedTopic = outputTopic).dummy()
    
    program = PythonSortApp(
        doDebug = shouldDebug,
        broker_list = json.loads(broker_list),
        input_topic = inputTopic,
        output_topic = outputTopic
    )

    program.execute()
