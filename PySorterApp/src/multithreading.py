from time import sleep, time
import math
from threading import Thread
from src.sorter import Sorter

class SortThread(Thread):
    def __init__(self, givenDatagram, sorter: Sorter, notifier):
        Thread.__init__(self)
        self.givenDatagram = givenDatagram
        self.sorter = sorter
        self.notifier = notifier

    def run(self):
        sleep(0.1)
        self.sorter.sort(self.givenDatagram['sampleArray'])
        self.givenDatagram['sortDoneTime'] = math.floor(time() * 1000)
        print('\nSorter Thread completed job!\nModified datagram: %s' % (self.givenDatagram))
        self.notifier.emitMessage(self.givenDatagram)

    def execute(self):
        self.start()

