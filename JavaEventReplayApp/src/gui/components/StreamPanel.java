package gui.components;

import java.awt.Dimension;
import java.awt.FlowLayout;

import javax.swing.JPanel;

import core.ProgramCore;
import gui.ProgramPanel;

public class StreamPanel extends JPanel {
	
	private static final long serialVersionUID = 3957596722719399231L;
	private int pw, ph;
	
	private ProgramPanel parentGUI;
	private ProgramCore parentCore;
	private StreamTopicPane pane1;
	private StreamLogPane pane2;
	
	public StreamPanel(ProgramPanel a, ProgramCore b) {
		super();
		this.parentGUI = a;
		this.parentCore = b;
		this.pw = this.parentGUI.getPanelWidth() * 2 / 3 - 10;
		this.ph = this.parentGUI.getPanelHeight();
		
		setLayout(new FlowLayout(FlowLayout.TRAILING, 0, 10));
		setPreferredSize(new Dimension(this.pw, this.ph));
		
		pane1 = new StreamTopicPane(this);
		pane2 = new StreamLogPane(this);
		
		add(pane1);
		add(pane2);
	}
	
	public ProgramPanel getParentGUI() {
		return this.parentGUI;
	}
	
	public ProgramCore getParentCore() {
		return this.parentCore;
	}
	
	public StreamTopicPane getStreamTopicPane() {
		return this.pane1;
	}
	
	public StreamPanel getStreamPanel() {
		return this;
	}
	
	public StreamLogPane getStreamListPane() {
		return this.pane2;
	}
	
	public int getPanelWidth() {
		return this.pw;
	}
	
	public int getPanelHeight() {
		return this.ph;
	}
}
