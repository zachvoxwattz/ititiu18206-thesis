require "dotenv"
Dotenv.load

require_relative "src/core"
require "json"


# Main entry of Ruby
if __FILE__ == $0

    broker_list = JSON.parse(ENV['BROKER_LIST'])
    consumer_id = ENV['CONSUMER_GROUPID']
    subbedTopic = ENV['SUBBED_TOPIC']
    isDebug = ENV['DEBUG_MODE']

    app = RubyResultTaker.new(broker_list, consumer_id, subbedTopic, isDebug)
    app.execute()
end