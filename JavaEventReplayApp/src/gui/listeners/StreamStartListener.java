package gui.listeners;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Objects;

import core.ProgramCore;
import core.components.StreamLogBulk;
import gui.components.StreamLogPane;
import gui.components.StreamPanel;
import gui.components.StreamTopicPane;

public class StreamStartListener implements ActionListener {
	
	private StreamTopicPane stp;
	private StreamLogPane slp;
	private StreamPanel sp;
	
	public StreamStartListener(StreamTopicPane a, StreamLogPane b, StreamPanel c) {
		this.stp = a;
		this.slp = b;
		this.sp = c;
	}
	
	@Override
	public void actionPerformed(ActionEvent e) {
		
		ProgramCore pCore = sp.getParentCore();
		String selectedTopic = stp.getSelectedTopic();
		
		if (Objects.isNull(pCore.getBulkByTopic(selectedTopic))) {
			StreamLogBulk test = pCore.createBulk(selectedTopic);
			test.startStream();
		}
		
		this.stp.getPauseStreamBtn().setEnabled(true);
		this.stp.getDeleteStreamBtn().setEnabled(true);
		this.stp.getStartStreamBtn().setEnabled(false);
	}
	
	public StreamLogPane getStreamLogPane() {
		return this.slp;
	}
}
