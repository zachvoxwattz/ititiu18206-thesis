require "json"

class InfoPrinter
    @debugMode
    def initialize(debugMode)
        @debugMode = debugMode
    end

    def printData(datagram)
        if @debugMode
            puts "\n--------------------"
            puts "New message!"
            puts " - Key:#{datagram.key}"
            puts " - Offset: #{datagram.offset}"
            puts " - Partition: #{datagram.partition}"
            puts " - Topic: #{datagram.topic}"
            puts " - Detailed Value:"
            
            detailedReport(datagram.value)

            puts "--------------------"
        else
            puts "Message delivered to Ruby App successfully"
        end
    end

    def detailedReport(jsonText)
        sample = JSON.parse(jsonText)
        puts "\t+ Message ID:\t#{sample['eventMessageID']}"
        puts "\t+ Array ID:\t#{sample['arrayID']}"
#        puts "\t+ Base Array:\t#{sample['sampleArray']}"
#        puts "\t+ Sorted Array:\t#{sample['sortedArray']}"
        puts "\t+ Start Time (UNIX timestamp):\t#{sample['startedTime']}"
        puts "\t+ Done Time (UNIX timestamp):\t#{sample['doneTime']}"
        puts "\t+ Time difference:\t#{sample['doneTime'].to_i - sample['startedTime'].to_i}"
    end
end