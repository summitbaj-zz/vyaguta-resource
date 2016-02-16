package com.lftechnology.vyaguta.commons.pojo;

import com.lftechnology.vyaguta.commons.util.JsonToStringBuilder;

/**
 * 
 * @author Kailash Bijayananda <kailashraj@lftechnology.com>
 *
 */
public class ErrorMessage {
  private String error;

  public ErrorMessage(String error) {
    this.error = error;
  }

  public String getError() {
    return error;
  }

  public void setError(String error) {
    this.error = error;
  }

  @Override
  public String toString() {
    return JsonToStringBuilder.toString(this);
  }
}
