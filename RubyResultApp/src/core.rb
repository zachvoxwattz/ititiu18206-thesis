require "ruby-kafka"
require_relative "info_printer"

class RubyResultTaker
    
    # Instance variables
    @kafkaCore
    @executiveConsumer
    @infoPrinter

    def initialize(broker_list, consumer_group_id, subbed_topic)
        puts "Creating a new Ruby Receiver..."

        @kafkaCore = Kafka.new(seed_brokers: broker_list, )
        @executiveConsumer = @kafkaCore.consumer(group_id: consumer_group_id)
        @executiveConsumer.subscribe(subbed_topic)
        @infoPrinter = InfoPrinter.new()

        puts "Initialization completed."
    end

    def execute
        @executiveConsumer.each_message do |object|
            @infoPrinter.printData(object)
        end
    end
end