package com.lftechnology.vyaguta.commons.pojo;

import com.lftechnology.vyaguta.commons.util.JsonToStringBuilder;

/**
 * 
 * @author Kailash Bijayananda <kailashraj@lftechnology.com>
 *
 */
public class ErrorMessage {
    private String field;
    private String message;

    public ErrorMessage(String field, String message) {
        this.field = field;
        this.message = message;
    }

    public String getField() {
        return field;
    }

    public void setField(String field) {
        this.field = field;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return JsonToStringBuilder.toString(this);
    }
}
