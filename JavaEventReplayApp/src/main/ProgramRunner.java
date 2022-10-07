package main;

public class ProgramRunner {
	public static void main(String[] args) {
		JKafkaStream rp = new JKafkaStream("JApp", "Charlotte:9091", "tbSortedResults");
		
		rp.startStream();
	}
}
