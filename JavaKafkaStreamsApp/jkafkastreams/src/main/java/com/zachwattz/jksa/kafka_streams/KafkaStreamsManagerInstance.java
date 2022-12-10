package com.zachwattz.jksa.kafka_streams;

import org.apache.log4j.Level;
import org.apache.log4j.Logger;
import org.apache.log4j.BasicConfigurator;

import org.apache.kafka.common.serialization.Serde;
import org.apache.kafka.common.serialization.Serdes;

import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.ListTopicsOptions;

import org.apache.kafka.streams.StreamsConfig;

import java.util.ArrayList;
import java.util.List;
import java.util.Properties;
import java.util.Set;

public class KafkaStreamsManagerInstance {
    private boolean debugEnabled;
    private String hostTarget;
    private Properties props;
    private Serde<String> keySerde, valueSerde;
    
    private List<KafkaStreamsObject> activeKafkaStreamObjectList;
    private List<String> receivedTopics;

    public KafkaStreamsManagerInstance(String hostTarget, boolean debugEnabled) {
        this.hostTarget = hostTarget;
        this.debugEnabled = debugEnabled;
        this.activeKafkaStreamObjectList = new ArrayList<>();
        
        initConfigs();
        initProperties();
        retrieveTopics();
    }

    private void initConfigs() {
        BasicConfigurator.configure();
        Logger.getRootLogger().setLevel(Level.INFO);
        this.keySerde = Serdes.String();
        this.valueSerde = Serdes.String();
    }

    private void initProperties() {
        this.props = new Properties();
        this.props.putIfAbsent(StreamsConfig.APPLICATION_ID_CONFIG, "JKSSIO");
        this.props.putIfAbsent(StreamsConfig.CLIENT_ID_CONFIG, "JKSSIO-Core");
        this.props.putIfAbsent(StreamsConfig.BOOTSTRAP_SERVERS_CONFIG, this.hostTarget);
		this.props.putIfAbsent(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, this.hostTarget);
    }

    private void retrieveTopics() {
		AdminClient temporaryAdminClient = AdminClient.create(this.props);	
		ListTopicsOptions listTopicsOptions = new ListTopicsOptions();
		listTopicsOptions.listInternal(true);
		
		Set<String> returnSet = null;
		try { 
			returnSet = temporaryAdminClient.listTopics(listTopicsOptions).names().get();
		}
		catch (Exception e) {
			System.out.println(e);
		}
        finally {
            temporaryAdminClient.close();
        }

        this.receivedTopics = new ArrayList<>(returnSet);
        if (this.receivedTopics.contains("__consumer_offsets")) {
            this.receivedTopics.remove("__consumer_offsets");
        }

    }

    public KafkaStreamsObject createNewKafkaStreamInstance(String topic) {
        KafkaStreamsObject contemporary = new KafkaStreamsObject(this, topic);
        this.activeKafkaStreamObjectList.add(contemporary);
        return contemporary;
    }

    public void terminateService() {
        if (this.activeKafkaStreamObjectList.size() != 0) 
            this.activeKafkaStreamObjectList.forEach((item) -> item.stopStream());
    }

    public boolean isDebugEnabled() { return this.debugEnabled; }
    public Properties getProperties() { return this.props; }
    public List<String> getTopicList() { return this.receivedTopics; }
    public Serde<String> getKeySerde() { return this.keySerde; }
    public Serde<String> getValueSerde() { return this.valueSerde; }
}
