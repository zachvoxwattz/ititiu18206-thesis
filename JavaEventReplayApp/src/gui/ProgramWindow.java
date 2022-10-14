package gui;

import java.awt.EventQueue;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.UIManager;

import core.ProgramCore;

public class ProgramWindow extends JFrame {

	private static final long serialVersionUID = 7369534205252710620L;
	
	public ProgramWindow(ProgramCore progCore) {
		super();
			setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
			setTitle("Event Sourcing - Replay Type Software");
			setIconImage((new ImageIcon(getClass().getResource("/media/icon.png")).getImage()));
			setResizable(false);
			
			add(new ProgramPanel(this, progCore));
			pack();
			
			setLocationRelativeTo(null);
			setVisible(true);
	}
	
	public static void main(String[] args) {
		
		if (args.length < 2) {
			System.out.printf("\n[ERROR] Not enough parameters to run program!");
			System.out.printf("\nFor JDK 18 and above, run 'java [AppName here].jar <Broker Domain> <Broker Port>'");
			System.out.printf("\nFor JDK 17 and below, compile first by 'javac [AppName].jar'\nAnd then run 'java [AppName].jar <Broker Domain> <Broker Port> '");
			System.exit(0);
		}
		
		EventQueue.invokeLater(new RunTask(args[0], args[1]));
	}
}

class RunTask implements Runnable {

	private String arg1, arg2;
	
	public RunTask(String arg1, String arg2) {
		this.arg1 = arg1;
		this.arg2 = arg2;
	}
	
	@Override
	public void run() {
		try {
			UIManager.setLookAndFeel(
		            UIManager.getSystemLookAndFeelClassName());
		}
		catch (Exception e) {
			System.out.println(e);
		}
		new ProgramWindow(new ProgramCore(this.arg1, this.arg2));
	}
	
}