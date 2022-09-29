## A Framework for measuring a process in real-time event triggers and replayable events for training using Event-Driven Architecture, Event-Replay and Apache Kafka

<hr/>

Good day! This is the GitHub repository of my currently in progress Thesis project. Remember to read this README.md file carefully. Hence, you as the viewer will know how to set this project up properly!
<br/>
The project consists of 2 (updating...) main components:<br/>
&ensp;&ensp;&ensp;1. The Course Registration `Node.js` server (RTSApp) used to send data to brokers.<br/>
&ensp;&ensp;&ensp;2. The Entry broker - where it collects incoming data from Component #1.<br/>
&ensp;&ensp;&ensp;3. *TBA*<br/>
<br/>
<hr/>

#### The RTSApp
Perform the following steps to get the server running:
1. `cd` to the directory `/RTSApp`.
2. Assuming Node.js is installed, run `npm install` to get the dependencies. Otherwise, go to [Node.js Site](https://nodejs.org) to download.
3. After installing all dependencies, the server will return a console message `Server is operational on port <PORT NUMBER>`. And that's it!
4. Use Postman or related softwares to send custom REST calls to the server.
<br/>
<hr/>

#### The Entry Broker
This is an Apache Kafka application. So make sure Java and [itself](https://kafka.apache.org/downloads) are downloaded first (The version of which recommended by themselves is preferred). Also, it is recommended to run Kafka in Linux as many experienced users have proven the app utilizes better resources and possesses better performance than that of Windows. After that, follow these steps:
1. Extract the contents of the downloaded Kafka application. **Make sure the Directory path of to it DOES NOT contain any spaces!**. For example, the path `C:/ProgramData/Broker Server/kafka` is ineligible as it contains a white space.
2. Extract the configuration and launch scripts in `Kafka Configs` of my repository into the installation directory of the downloaded Kafka app.
3. `cd` to the Kafka application root and run `./start-ZK.sh` to start the Zookeeper server first (The syntax is the same regardless of using either WSL or Linux, if you use Linux, make sure that Java is installed beforehand!).
4. Run `./start-BKx.sh` to start Broker #x (1 -> 2) with x as the broker ID. Currently there are `2` brokers, more might be added later.
5. Perform your testings.
6. To stop all operations, stop the Kafka Clusters first by running `./stop-BKs.sh`. This will stop all Kafka brokers. Then run `./stop-ZK.sh` to stop the Zookeeper server.
