import math
from copy import deepcopy
from time import time
from threading import Thread
from src.sorter import Sorter
from src.notifier import ResultNotifier

class SortThread(Thread):
    def __init__(self, givenValue, givenKey, sorter: Sorter, notifier: ResultNotifier, debugMode):
        Thread.__init__(self)
        self.givenValue = givenValue
        self.givenKey = givenKey
        self.sorter = sorter
        self.notifier = notifier
        self.debugMode = debugMode

    def run(self):
        baseArray = deepcopy(self.givenValue['sampleArray'])
        startTime = time()
        sortedArray = self.sorter.sort(baseArray)   # Sorts the array
        endTime = time()
                
        if self.debugMode:
             print('\nSorter Thread completed job!')
        self.notifier.emitMessage(
            self.givenValue, 
            self.givenKey, 
            sorted_array = sortedArray,
            start_time = startTime,
            end_time = endTime
        )
        return

    def execute(self):
        self.start()
