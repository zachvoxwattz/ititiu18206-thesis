import math
from copy import deepcopy
from time import sleep, time
from threading import Thread
from src.sorter import Sorter

class SortThread(Thread):
    def __init__(self, givenDatagram, sorter: Sorter, notifier, debugMode = False):
        Thread.__init__(self)
        self.givenDatagram = givenDatagram
        self.sorter = sorter
        self.notifier = notifier
        self.debugMode = debugMode

    def run(self):
        baseArray = deepcopy(self.givenDatagram['sampleArray'])
        sortedArray = self.sorter.sort(baseArray)   # Sorts the array
        doneTime = math.floor(time() * 1000)
                
        if self.debugMode:
             print('\nSorter Thread completed job!\nModified datagram: %s' % (self.givenDatagram))
        self.notifier.emitMessage(self.givenDatagram, sorted_array = sortedArray, done_time = doneTime)
        return

    def execute(self):
        self.start()
