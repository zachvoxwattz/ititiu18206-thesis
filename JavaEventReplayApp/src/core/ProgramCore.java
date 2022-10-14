package core;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Properties;
import java.util.Set;

import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.ListTopicsOptions;

import core.components.StreamLogBulk;

public class ProgramCore {
	
	private String brokerDomain, brokerPort, brokerAddress;
	private List<StreamLogBulk> bulks;
	
	public ProgramCore(String domain, String port) {
		this.brokerDomain = domain;
		this.brokerPort = port;
		this.brokerAddress = this.brokerDomain + ":" + this.brokerPort;
		
		this.bulks = new ArrayList<>();
	}
	
	public Set<String> getTopics() {
		
		Properties adminProps = new Properties();
		adminProps.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, this.brokerAddress);
		
		AdminClient adminClient = AdminClient.create(adminProps);
		
		ListTopicsOptions listTopicsOptions = new ListTopicsOptions();
		listTopicsOptions.listInternal(true);
		
		Set<String> returnSet = null;
		
		try { 
			returnSet = adminClient.listTopics(listTopicsOptions).names().get();
		}
		catch (Exception e) {
			System.out.println(e);
		}
		
		return returnSet;
	}
	
	public StreamLogBulk createBulk(String topic) {
		StreamLogBulk slb = new StreamLogBulk(this, topic);
		this.bulks.add(slb);
		
		return slb;
	}
	
	public StreamLogBulk getBulkByTopic(String topic) {
		
		StreamLogBulk returnBulk = null;
		
		Iterator<StreamLogBulk> itor = bulks.iterator();
		while (itor.hasNext()) {
			StreamLogBulk item = itor.next();
			
			if (item.getBulkTopic().equals(topic)) {
				returnBulk = item;
				break;
			}
		}
		
		return returnBulk;
	}
	
	public String getBrokerDomain() {
		return this.brokerDomain;
	}
	
	public String getBrokerPort() {
		return this.brokerPort;
	}
	
	public String getBrokerAddress() {
		return this.brokerAddress;
	}
}
