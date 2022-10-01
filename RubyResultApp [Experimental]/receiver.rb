require "kafka"

brokers = ['Iris:9091', 'Iris:9092']
subbedTopic = 'tbSortedResults'

receiver = Kafka.new(brokers)

receiver.each_message(topic: subbedTopic) do |itor|
    puts itor.value
end