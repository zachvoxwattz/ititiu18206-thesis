require_relative "src/core"

BROKER_LIST = ["Iris:9091"]
CONSUMER_GROUPID = "RubyAppConsumer"
SUBBED_TOPIC = "tbSortedResults"

app = RubyResultTaker.new(BROKER_LIST, CONSUMER_GROUPID, SUBBED_TOPIC)
app.execute()