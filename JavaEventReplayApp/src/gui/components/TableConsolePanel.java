package gui.components;

import java.awt.Color;
import java.awt.Dimension;

import javax.swing.JPanel;

import core.ProgramCore;
import gui.ProgramPanel;

public class TableConsolePanel extends JPanel {
	
	private static final long serialVersionUID = 3957596722719399231L;
	private int pw, ph;

	private ProgramPanel parentGUI;
	private ProgramCore parentCore;
	
	public TableConsolePanel(ProgramPanel a, ProgramCore b) {
		super();
		this.parentGUI = a;
		this.parentCore = b;
		this.pw = this.parentGUI.getPanelWidth() * 1 / 3 - 20;
		this.ph = this.parentGUI.getPanelHeight();
		
		setPreferredSize(new Dimension(this.pw, this.ph));
		setBackground(Color.YELLOW);
	}
	
	public ProgramPanel getParentGUI() {
		return this.parentGUI;
	}
	
	public ProgramCore getParentCore() {
		return this.parentCore;
	}
	
	public int getPanelWidth() {
		return this.pw;
	}
	
	public int getPanelHeight() {
		return this.ph;
	}
}
