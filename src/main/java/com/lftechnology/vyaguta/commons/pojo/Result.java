package com.lftechnology.vyaguta.commons.pojo;

import java.util.ArrayList;
import java.util.List;

import com.lftechnology.vyaguta.commons.util.JsonToStringBuilder;

/**
 * 
 * @author anish
 *
 * @param <T>
 */
public class Result<D> {
    private D data;
    private List<DataError> errors;
    private String type = MessageType.INFO.toString();
    private String message;

    public Result() {
        super();
    }

    public Result(D data) {
        this.data = data;
    }

    public Result(Result<D> result) {
        this.data = result.data;
    }

    public D getData() {
        return data;
    }

    public void setData(D data) {
        this.data = data;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<DataError> getErrors() {
        if (this.errors == null) {
            this.errors = new ArrayList<DataError>();
        }
        return errors;
    }

    public void setErrors(List<DataError> errors) {
        this.errors = errors;
    }

    public void addError(String code, String message) {
        DataError error = new DataError(code, message);
        getErrors().add(error);
    }

    public void addError(String id, String code, String message) {
        DataError error = new DataError(id, code, message);
        getErrors().add(error);
    }

    public void addError(final DataError error) {
        getErrors().add(error);
    }

    public boolean isSuccess() {
        return (getErrors() == null || getErrors().isEmpty());
    }

    @Override
    public String toString() {
        return JsonToStringBuilder.toString(this);
    }

    public static class DataError {
        private String id;
        private String code;
        private String message;

        public DataError() {
            super();
        }

        public DataError(String message) {
            this.message = message;
        }

        public DataError(String code, String message) {
            this.code = code;
            this.message = message;
        }

        public DataError(String id, String code, String message) {
            this.id = id;
            this.code = code;
            this.message = message;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public String getCode() {
            return code;
        }

        public void setCode(String code) {
            this.code = code;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

    }

    public static enum MessageType {
        INFO, WARN, ERROR
    }
}
