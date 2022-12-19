package com.zachwattzkero.models;

public class RequestUpdateDatagram {
    private boolean requestUpdateTopics;

    public RequestUpdateDatagram() {}
    public RequestUpdateDatagram(boolean b) {
        this.requestUpdateTopics = b;
    }

    public boolean getRequestUpdateTopics() { return this.requestUpdateTopics; }
}
