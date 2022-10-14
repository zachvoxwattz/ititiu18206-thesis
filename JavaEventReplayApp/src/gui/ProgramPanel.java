package gui;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.FlowLayout;

import javax.swing.JPanel;

import core.ProgramCore;
import gui.components.StreamPanel;
import gui.components.TableConsolePanel;

public class ProgramPanel extends JPanel {
	
	private static final long serialVersionUID = -5082163020053504276L;
	private int ww = 1366, wh = 768;
	
	private ProgramWindow mainWindow;
	private ProgramCore programCore;
	private StreamPanel panel1;
	private TableConsolePanel panel2;
	
	public ProgramPanel(ProgramWindow parent, ProgramCore pCore) {
		
		super();
		this.mainWindow = parent;
		this.programCore = pCore;
		
		setLayout(new FlowLayout(FlowLayout.LEADING, 10, 10));
		setBackground(new Color(25, 29, 31));
		setPreferredSize(new Dimension(ww, wh + 20));
		
		panel1 = new StreamPanel(this, this.programCore);
		panel2 = new TableConsolePanel(this, this.programCore);
		
		add(panel1);
		add(panel2);
	}
	
	public ProgramWindow getMainWindow() {
		return this.mainWindow;
	}
	
	public ProgramCore getProgramCore() {
		return this.programCore;
	}
	
	public int getPanelWidth() {
		return this.ww;
	}
	
	public int getPanelHeight() {
		return this.wh;
	}
}
