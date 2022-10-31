package gui.components;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.FlowLayout;

import java.util.Random;

import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;

public class StreamLogPane extends JPanel {

	private static final long serialVersionUID = -8385522114902155888L;
	private int pw, ph;

	private StreamPanel parent;
	private StreamTopicPane parterPane;
	private ScrollableStreamPanel scrollablePane;
	
	public StreamLogPane(StreamPanel a) {
		super();
		
		this.parent = a;
		this.parterPane = this.parent.getStreamTopicPane();
		this.pw = this.parent.getPanelWidth();
		this.ph = this.parent.getPanelHeight() * 6 / 7 + 1;
		
		setPreferredSize(new Dimension(this.pw, this.ph));
		setBackground(new Color(44, 49, 53));
		
		this.scrollablePane = new ScrollableStreamPanel(this);
		add(scrollablePane);
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

class ScrollableStreamPanel extends JScrollPane {

	private static final long serialVersionUID = 1L;
	private int pw, ph;
	
	private JPanel loggerPanel;
	private StreamLogPane parent;
	
	public ScrollableStreamPanel(StreamLogPane parent) {
		super();
		
		this.parent = parent;
		this.pw = this.parent.getPanelWidth();
		this.ph = this.parent.getPanelHeight();
		this.loggerPanel = new JPanel();
			this.loggerPanel.setPreferredSize(new Dimension(this.pw, this.loggerPanel.getPreferredSize().height));
			this.loggerPanel.setLayout(new FlowLayout());
		
		setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);
		setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_NEVER);
		
		setPreferredSize(new Dimension(this.pw, this.ph));
		setViewportView(this.loggerPanel);


		Random temp = new Random();
		for (int i = 0; i < 100; i++) {
			JPanel pne = new JPanel();
			
			pne.setPreferredSize(new Dimension(this.pw, 100));
			pne.setBackground(new Color(temp.nextInt(256), temp.nextInt(256), temp.nextInt(256)));
			String n = "Lorem ipsum dolor sit amet" + i;
			pne.add(new JLabel(n));
			this.loggerPanel.add(pne);
			this.loggerPanel.setPreferredSize(new Dimension(this.pw, this.loggerPanel.getPreferredSize().height + 105));
		}

		JPanel pne = new JPanel();
		
		pne.setPreferredSize(new Dimension(this.pw, 100));
		pne.setBackground(new Color(temp.nextInt(256), temp.nextInt(256), temp.nextInt(256)));
		String n = "Lorem ipsum dolor sit amet" + " LAST";
		pne.add(new JLabel(n));
		this.loggerPanel.add(pne);
		this.loggerPanel.setPreferredSize(new Dimension(this.pw, this.loggerPanel.getPreferredSize().height + 105));
		
		this.loggerPanel.setPreferredSize(new Dimension(this.pw, this.loggerPanel.getPreferredSize().height + 20));
	}
	
	public int getPanelWidth() {
		return this.pw;
	}
	
	public int getPanelHeight() {
		return this.ph;
	}
}
