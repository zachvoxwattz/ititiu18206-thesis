import src.receiver as recv
import src.notifier as noti

if __name__ == '__main__':
    sender = noti.KafKaNotifier()
    runner = recv.DataReceiver(sender)
    runner.subscribeTopic('tbSorted')
    runner.acceptRequests(shouldPrintInfo=True, )