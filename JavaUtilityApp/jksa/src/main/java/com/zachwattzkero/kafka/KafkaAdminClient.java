package com.zachwattzkero.kafka;

import java.util.Set;
import java.util.List;
import java.util.ArrayList;
import java.util.Properties;

import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.ListTopicsOptions;

public class KafkaAdminClient {
    
    private boolean debugEnabled;

    private Properties adminProps;
    private AdminClient adminClient;

    public KafkaAdminClient(String brokerAddress, boolean enableDebug) {
        this.debugEnabled = enableDebug;
        this.adminProps = new Properties();
            this.adminProps.putIfAbsent(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, brokerAddress);

        this.adminClient = AdminClient.create(this.adminProps);
        if (this.debugEnabled) System.out.println("\n[KafkaAdminClient] Client initialized");
    }

    public List<String> getTopicList() {
        ListTopicsOptions ltops = new ListTopicsOptions();
            ltops.listInternal(true);

        Set<String> returnSet = null;

        try { returnSet = this.adminClient.listTopics(ltops).names().get(); }
        catch (Exception e) { System.out.println(e); }

        List<String> returnTopics = new ArrayList<>(returnSet);
        if (returnTopics.contains("__consumer_offsets")) {
            returnTopics.remove("__consumer_offsets");
        }

        return returnTopics;
    }

    public void closeClient() {
        this.adminClient.close();
        if (this.debugEnabled) System.out.println("[KafkaAdminClient] Client closed!");
    }
}
