class InfoPrinter
    def initialize
    end

    def printData(datagram)
        puts "\n--------------------"
        puts "New message!"
        puts " - Key: #{datagram.key}"
        puts " - Offset: #{datagram.offset}"
        puts " - Partition: #{datagram.partition}"
        puts " - Topic: #{datagram.topic}"
        puts " - Value: #{datagram.value}"
        puts "--------------------"
    end
end