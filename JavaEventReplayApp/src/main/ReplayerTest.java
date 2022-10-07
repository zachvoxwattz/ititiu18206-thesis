package main;

import org.apache.kafka.common.serialization.Serdes;
import org.apache.kafka.common.utils.Bytes;
import org.apache.kafka.streams.KafkaStreams;
import org.apache.kafka.streams.StreamsBuilder;
import org.apache.kafka.streams.StreamsConfig;
import org.apache.kafka.streams.Topology;
import org.apache.kafka.streams.kstream.KStream;
import org.apache.kafka.streams.kstream.KTable;
import org.apache.kafka.streams.kstream.Materialized;
import org.apache.kafka.streams.kstream.Produced;
import org.apache.kafka.streams.state.KeyValueStore;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.Properties;
import java.util.regex.Pattern;

public class ReplayerTest {
	
	private Properties props;
	private StreamsBuilder sBuilder;
	private KStream<String, String> kStr;
	private KTable<String, String> kTbl;
	private Path stateDir;
	private Topology tplg;
	
	public ReplayerTest(String appID, String svAddress, String subbedTopic) {
		props = new Properties();
		props.put(StreamsConfig.COMMIT_INTERVAL_MS_CONFIG, "5000");
		props.put(StreamsConfig.APPLICATION_ID_CONFIG, appID);
		props.put(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, svAddress);
		props.put(StreamsConfig.DEFAULT_KEY_SERDE_CLASS_CONFIG, Serdes.String().getClass());
		props.put(StreamsConfig.DEFAULT_VALUE_SERDE_CLASS_CONFIG, Serdes.String().getClass());
		
		try {
			stateDir = Files.createTempDirectory("kafka-streams");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		props.put(StreamsConfig.STATE_DIR_CONFIG, this.stateDir.toAbsolutePath().toString());
		
		
		buildTopology(subbedTopic);
	}
	
	private void buildTopology(String subbedTopic) {
		sBuilder = new StreamsBuilder();
		kStr = sBuilder.stream(subbedTopic);
//		kTbl = sBuilder.table(subbedTopic, Materialized.with(Serdes.String(), Serdes.String()));
		kStr.foreach((word, val) -> System.out.printf("\n------\nKey: %s\nValue: %s\n------", word, val));
	}
	
	public void startStream() {
		KafkaStreams streams = null;
		tplg = this.sBuilder.build();
		
		try { 
			streams = new KafkaStreams(tplg, this.props); 
			streams.start();
		}
		catch (Exception e) {
			System.out.println(e);
		}
	}
}