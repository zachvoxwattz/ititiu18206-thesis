package core.components;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.StreamsConfig;
import org.apache.kafka.streams.Topology;
import org.apache.kafka.streams.kstream.KStream;

import core.ProgramCore;

public class StreamLogBulk {

	private StreamsBuilder StrBuilder;
	private Topology tplg;
	private KStream<String, String> KStr;
	private ProgramCore parent;
	private Properties clientProps;
	private String subcribedTopic;
	private Path stateDirectory;
	private List<String> records;
	
	public StreamLogBulk(ProgramCore parent, String topic) {
		this.parent = parent;
		this.subcribedTopic = topic;
		records = new ArrayList<>();
		
		clientProps = new Properties();
		clientProps.put(StreamsConfig.COMMIT_INTERVAL_MS_CONFIG, "5000");
		clientProps.put(StreamsConfig.APPLICATION_ID_CONFIG, "JEventReplayApp");
		clientProps.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, this.parent.getBrokerAddress());
		clientProps.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
		clientProps.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());
		
		try {
			stateDirectory = Files.createTempDirectory("kafka-streams");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		clientProps.put(StreamsConfig.STATE_DIR_CONFIG, this.stateDirectory.toAbsolutePath().toString());
		
		buildTopology(subcribedTopic);
	}
	
	private void buildTopology(String subbedTopic) {
		StrBuilder = new StreamsBuilder();
		KStr = StrBuilder.stream(subbedTopic);
		KStr.foreach((word, val) -> System.out.printf("\n------\nKey: %s\nValue: %s\n------", word, val));
	}
	
	public void startStream() {
		KafkaStreams streams = null;
		tplg = this.StrBuilder.build();
		
		try { 
			streams = new KafkaStreams(tplg, this.clientProps); 
			streams.start();
		}
		catch (Exception e) {
			System.out.println(e);
		}
	}
	
	public String getBulkTopic() {
		return this.subcribedTopic;
	}
	
	public List<String> getRecords() {
		return this.records;
	}
}
