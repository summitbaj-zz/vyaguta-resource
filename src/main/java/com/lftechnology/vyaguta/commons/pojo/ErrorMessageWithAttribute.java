package com.lftechnology.vyaguta.commons.pojo;

public class ErrorMessageWithAttribute extends ErrorMessage {

  private String field;

  public ErrorMessageWithAttribute(String field, String error) {
    super(error);
    this.field = field;
  }

  public String getField() {
    return field;
  }

  public void setField(String field) {
    this.field = field;
  }
}
