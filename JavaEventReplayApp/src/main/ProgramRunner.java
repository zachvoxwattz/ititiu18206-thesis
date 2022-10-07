package main;

public class ProgramRunner {
	public static void main(String[] args) {
		ReplayerTest rp = new ReplayerTest("JApp", "Charlotte:9091", "tbSortedResults");
		
		rp.startStream();
	}
}
