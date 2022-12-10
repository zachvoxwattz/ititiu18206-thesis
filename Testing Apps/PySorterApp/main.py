import os
import json
from src.env_validator import ENVV
from src.core import PythonSortApp
from dotenv import load_dotenv

if __name__ == '__main__':
    ### Initializes app's ENVs
    load_dotenv()

    debugMode = False if os.getenv('DEBUG_MODE') == 'False' or os.getenv('DEBUG_MODE') == None or os.getenv('DEBUG_MODE') == '' else True    
    brokers_env = os.getenv('BROKER_LIST')
    inputTopic = os.getenv('SUBBED_INPUT_TOPIC')
    outputTopic = os.getenv('SUBBED_OUTPUT_TOPIC')

    ENVV(brokerArray = brokers_env, inputSubbedTopic = inputTopic, outputSubbedTopic = outputTopic).dummy()
    broker_list = json.loads(brokers_env)

    program = PythonSortApp(
        doDebug = debugMode,
        broker_list = broker_list,
        input_topic = inputTopic,
        output_topic = outputTopic
    )

    program.execute()
