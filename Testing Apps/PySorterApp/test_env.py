import json
import os
import re
from dotenv import load_dotenv

load_dotenv()
# Test your ENVs down below!

samp = 'kafka1:'
res = re.search('[a-zA-Z0-9.]+:[0-9]+', samp)


if not res:
    print('hes')
