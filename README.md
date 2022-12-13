## An application for measuring and testing processes in real-time event triggers and replayable events for training using Event-Driven Architecture, Event-Replay and Apache Kafka.

<hr/>

Good day! This is a prototype branch of the GitHub repository of my currently in progress Thesis project. Remember to read this README.md file carefully. Hence, you as the viewer will know how to set this project up properly!
<br/>
The project consists of 3 components:<br/>
&ensp;&ensp;&ensp;1. NodeUtilityApp - provides GUI for user for easier to interact with the application.<br/>
&ensp;&ensp;&ensp;2. JavaUtilityApp - intakes data as streams and performs broadcasts to requested clients.<br/>
&ensp;&ensp;&ensp;3. Kafka Cluster - this component itself is quite self-explanatory.<br/>

Sub-components for testings:
&ensp;&ensp;&ensp;1. NodeDistributorApp - provides GUI for user for easier to send test data.<br/>
&ensp;&ensp;&ensp;2. PySorterApp - processes data.<br/>
&ensp;&ensp;&ensp;3. RubyReporterApp - receives processed data.<br/>
<br/>
<hr/>

#### NodeUtilityApp
1. Have [NodeJS](https://nodejs.org) installed.
2. `cd` to the directory `/NodeUtilityApp`.
3. `cd` to both `backapp`, `frontapp-react` and run `npm install` of each directory to get required dependencies.
4. For `backapp`, run `nodemon startApp` or `node startApp`.
5. For `frontapp-react`, run `npm run build` first. Once the process is completed, run `serve -s build`.
<br/>
<hr/>

#### Kafka Cluster
This is an Apache Kafka application. So make sure [it is](https://kafka.apache.org/downloads) downloaded first (The version of which recommended by themselves is preferred). Also, it is recommended to run Kafka in Linux as many experienced users have proven the app utilizes better resources and possesses better performance than that of Windows. After that, follow these steps:
1. Extract the contents of the downloaded Kafka application. **Make sure the Directory path of to it DOES NOT contain any spaces!**. For example, the path `C:/ProgramData/Broker Server/kafka` is ineligible as it contains a single white space.
2. Extract the configuration and launch scripts in `Kafka Configs` of my repository into the installation directory of the downloaded Kafka app.
3. `cd` to the Kafka application root and run `./start-ZK.sh` to start the Zookeeper server first (The syntax is the same regardless of using either WSL or Linux, if you use Linux, make sure that Java is installed beforehand!).
4. Run `./start-BKx.sh` to start Broker #x (1 -> 2) with x as the broker ID. Currently there are `2` brokers, more might be added later.
5. Perform your testings.
6. To stop all operations, stop the Kafka brokers first by running `./stop-BKs.sh`. Then run `./stop-ZK.sh` to stop the Zookeeper server. **DO NOT STOP THE ZOOKEEPER FIRST!**.
<br/>
<hr/>

#### JavaUtilityApp
This is a Java application used for receiving data as streams. Follow the steps:
1. Have Java installed. More specifically, JDK 19.
2. Have Maven installed as this App was built using Maven archetype. Either using command line or Visual Studio Code's extension is OK.
3. `cd` to `jksa` directory of the App. If command line is preferred, run `mvn package` to build the project. If Visual Studio Code's extension is preferred, simply run the project to build it.
4. To stop the App, use Ctrl + C or Stop button in Visual Studio Code.
<br/>
<hr/>

#### Port numbers list:
1. NodeUtilityApp: `3000` - `3001`.
2. JavaUtilityApp: `9091`, `9092`, `3004`.
3. Testing Apps: `3002` - `3003`.