package gui.components;

import java.awt.Dimension;
import java.awt.Graphics;

import javax.swing.JPanel;

public class StreamDataPane extends JPanel {
	
	private static final long serialVersionUID = -8840372588591778499L;
	private static int PANE_HEIGHT = 100;
	
	private ScrollableStreamPane parent;
	
	public StreamDataPane(ScrollableStreamPane parent) {
		super();
		this.parent = parent;
		setPreferredSize(new Dimension(this.parent.getPanelWidth() - 3, PANE_HEIGHT));
	}
	
	public void paintComponent(Graphics g) {
		g.drawRect(0, 0, this.getPreferredSize().width, this.getPreferredSize().height - 1);
	}
}
