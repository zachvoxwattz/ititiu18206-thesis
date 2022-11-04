package gui.components;

import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.Font;
import java.util.Iterator;
import java.util.Set;

import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.border.EmptyBorder;

import gui.listeners.StreamDeletionListener;
import gui.listeners.StreamPauseListener;
import gui.listeners.StreamStartListener;

public class StreamTopicPane extends JPanel {

	private static final long serialVersionUID = -8385522114902155888L;
	private int pw, ph;
	
	private StreamPanel parent;
	private StreamLogPane partnerPane;
	private JLabel comboBoxlbl;
	private JComboBox<String> topics;
	private JButton startStream, pauseStream, deleteStream;
	
	public StreamTopicPane(StreamPanel a) {
		super();
		this.parent = a;
		this.pw = this.parent.getPanelWidth();
		this.ph = this.parent.getPanelHeight() * 1 / 7;
		
		setLayout(new FlowLayout(FlowLayout.LEADING, 0, 0));
		setPreferredSize(new Dimension(this.pw, this.ph));
		
		initializeComboBox();
	}
	
	private void initializeComboBox() {
		Set<String> receivedTopics = parent.getParentCore().getTopics();
		String[] toBeListed = new String[receivedTopics.size() + 1];
		
		if (receivedTopics.size() == 0) {
			toBeListed = new String[1];
			toBeListed[0] = "None";
		}
		else {
			toBeListed[0] = "---Not selected---";
			Iterator<String> topicz = receivedTopics.iterator();
			int currI = 1;
			while (topicz.hasNext()) {
				String item = topicz.next();
				toBeListed[currI] = item;
				currI++;
			}
		}
		
		comboBoxlbl = new JLabel("Available Topics:");
		comboBoxlbl.setFont(new Font("SF Pro", Font.BOLD, 20));
		comboBoxlbl.setBorder(new EmptyBorder(this.ph * 1 / 10, (int) (this.pw * 0.26166667), 0, 0));
		add(comboBoxlbl);
		
		topics = new JComboBox<>(toBeListed);
		topics.setFont(new Font("SF Pro", Font.PLAIN, 20));
		topics.setFocusable(false);
		topics.setBorder(new EmptyBorder(this.ph * 1 / 10, this.pw * 1 / 75, 0, 0));
		add(topics);
	}
	
	private void initializeButtons() {
		
		JPanel buttonBox = new JPanel();
		
		startStream = new JButton("Start Stream");
			startStream.setFocusable(false);
			startStream.addActionListener(new StreamStartListener(this, this.partnerPane));
			
		pauseStream = new JButton("Pause Stream");
			pauseStream.setFocusable(false);
			pauseStream.setEnabled(false);
			pauseStream.addActionListener(new StreamPauseListener(this, this.partnerPane));
			
		deleteStream = new JButton("Delete Stream");
			deleteStream.setFocusable(false);
			deleteStream.setEnabled(false);
			deleteStream.addActionListener(new StreamDeletionListener(this, this.partnerPane));
			
		buttonBox.add(startStream);
		buttonBox.add(pauseStream);
		buttonBox.add(deleteStream);
		buttonBox.setBorder(new EmptyBorder(this.ph * 1 / 10, (int) (this.pw * 0.25375), 0, 0));
		
		add(buttonBox);
	}
	
	public void getPartnerPane(StreamLogPane s) {
		this.partnerPane = s;
		initializeButtons();
	}
	
	public String getSelectedTopic() {
		return (String) this.topics.getSelectedItem();
	}
	
	public JButton getStartStreamBtn() {
		return this.startStream;
	}
	
	public JButton getPauseStreamBtn() {
		return this.pauseStream;
	}
	
	public JButton getDeleteStreamBtn() {
		return this.deleteStream;
	}
	
	public StreamPanel getParentPanel() {
		return this.parent;
	}
	
	public StreamLogPane getStreamListPane() {
		return this.partnerPane;
	}
	
	public int getPanelWidth() {
		return this.pw;
	}
	
	public int getPanelHeight() {
		return this.ph;
	}
}