package com.zachwattzkero.models;

public class RequestTopicUpdateDatagram {
    private boolean requestUpdateTopics;

    public RequestTopicUpdateDatagram() {}
    public RequestTopicUpdateDatagram(boolean a) {
        this.requestUpdateTopics = a;
    }
    public boolean getRequestUpdateTopics() { return this.requestUpdateTopics; }
}
