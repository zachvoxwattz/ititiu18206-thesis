package gui.listeners;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Objects;

import core.ProgramCore;
import core.components.StreamLogBulk;

import gui.components.StreamLogPane;
import gui.components.StreamTopicPane;

public class StreamStartListener implements ActionListener {
	
	private StreamTopicPane stp;
	private StreamLogPane slp;
	
	public StreamStartListener(StreamTopicPane a, StreamLogPane b) {
		this.stp = a;
		this.slp = b;
	}
	
	@Override
	public void actionPerformed(ActionEvent e) {
		this.slp.removeInitialLabel();
		ProgramCore pCore = this.slp.getParentPanel().getParentCore();
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
