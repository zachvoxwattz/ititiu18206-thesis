import src.receiver as recv
import src.notifier as noti

shouldDebug = False

if __name__ == '__main__':
    runner = recv.DataReceiver(notifier = noti.KafKaNotifier(), debugEnabled = shouldDebug)
    runner.subscribeTopic('tbSorted')
    runner.acceptRequests()