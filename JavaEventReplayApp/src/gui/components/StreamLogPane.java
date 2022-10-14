package gui.components;

import java.awt.Color;
import java.awt.Dimension;

import javax.swing.JPanel;

public class StreamLogPane extends JPanel {

	private static final long serialVersionUID = -8385522114902155888L;
	private int pw, ph;

	private StreamPanel parent;
	private StreamTopicPane parterPane;
	
	public StreamLogPane(StreamPanel a) {
		super();
		this.parent = a;
		this.parterPane = this.parent.getStreamTopicPane();
		this.pw = this.parent.getPanelWidth();
		this.ph = this.parent.getPanelHeight() * 6 / 7 + 1;
		
		setPreferredSize(new Dimension(this.pw, this.ph));
		setBackground(new Color(44, 49, 53));
	}
	
	public StreamTopicPane getStreamTopicPane() {
		return this.parterPane;
	}
	
	public int getPanelWidth() {
		return this.pw;
	}
	
	public int getPanelHeight() {
		return this.ph;
	}
}
