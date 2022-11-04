package gui.components;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.FlowLayout;

//import java.util.Random;

import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;

public class StreamLogPane extends JPanel {

	private static final long serialVersionUID = -8385522114902155888L;
	private int pw, ph;

	private StreamPanel parent;
	private StreamTopicPane partnerPane;
	private ScrollableStreamPane scrollablePane;
	private JLabel landingLabel;
	
	public StreamLogPane(StreamPanel a) {
		super();
		
		this.parent = a;
		this.pw = this.parent.getPanelWidth();
		this.ph = this.parent.getPanelHeight() * 6 / 7 + 1;
		
		setPreferredSize(new Dimension(this.pw, this.ph));
		setBackground(new Color(44, 49, 53));
		setLayout(new BorderLayout());
		
		this.scrollablePane = new ScrollableStreamPane(this);
		
		landingLabel = new JLabel("No stream started! Select a topic and click Start Stream to view");
		landingLabel.setHorizontalAlignment(JLabel.CENTER);
		add(landingLabel, BorderLayout.CENTER);
	}
	
	public void removeInitialLabel() {
		remove(landingLabel);
		add(this.scrollablePane);
		revalidate();
		repaint();
	}
	
	public void getPartnerPane(StreamTopicPane s) {
		this.partnerPane = s;
	}
	
	
	public ScrollableStreamPane getScrollableStreamPanel() {
		return this.scrollablePane;
	}
	
	public StreamPanel getParentPanel() {
		return this.parent;
	}
	
	public StreamTopicPane getStreamTopicPane() {
		return this.partnerPane;
	}
	
	public int getPanelWidth() {
		return this.pw;
	}
	
	public int getPanelHeight() {
		return this.ph;
	}
}

class ScrollableStreamPane extends JScrollPane {

	private static final long serialVersionUID = 117325781327847128L;
	private int pw, ph;
	
	private JPanel loggerPanel;
	private StreamLogPane parent;
	
	public ScrollableStreamPane(StreamLogPane parent) {
		super();
		
		this.parent = parent;
		this.pw = this.parent.getPanelWidth();
		this.ph = this.parent.getPanelHeight();
		this.loggerPanel = new JPanel();
			this.loggerPanel.setPreferredSize(new Dimension(this.pw, this.loggerPanel.getPreferredSize().height));
			this.loggerPanel.setLayout(new FlowLayout(FlowLayout.LEADING, 0, 0));
		
		setVerticalScrollBarPolicy(JScrollPane.VERTICAL_SCROLLBAR_AS_NEEDED);
		setHorizontalScrollBarPolicy(JScrollPane.HORIZONTAL_SCROLLBAR_NEVER);
		
		setPreferredSize(new Dimension(this.pw, this.ph));
		setViewportView(this.loggerPanel);

//		Random temp = new Random();
//		for (int i = 0; i < 100; i++) {
//			JPanel pne = new JPanel();
//			
//			pne.setPreferredSize(new Dimension(this.pw, 100));
//			pne.setBackground(new Color(temp.nextInt(256), temp.nextInt(256), temp.nextInt(256)));
//			String n = "Lorem ipsum dolor sit amet" + i;
//			pne.add(new JLabel(n));
//			this.loggerPanel.add(pne);
//			this.loggerPanel.setPreferredSize(new Dimension(this.pw, this.loggerPanel.getPreferredSize().height + 105));
//		}

		StreamDataPane dpane = new StreamDataPane(this);
		
		this.loggerPanel.add(dpane);
		this.loggerPanel.setPreferredSize(new Dimension(this.pw, this.loggerPanel.getPreferredSize().height + 105));
		this.loggerPanel.setPreferredSize(new Dimension(this.pw, this.loggerPanel.getPreferredSize().height + 20));
	}
	
	public int getPanelWidth() {
		return this.pw;
	}
	
	public int getPanelHeight() {
		return this.ph;
	}
	
	public JPanel getLoggerPanel() {
		return this.loggerPanel;
	}
	
	public StreamLogPane getParentPane() {
		return this.parent;
	}
}
