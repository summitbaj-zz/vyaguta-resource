package com.lftechnology.vyaguta.commons.jpautil;

import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

/**
 * 
 * @author Kailash Bijayananda <kailashraj@lftechnology.com>
 *
 */
public class LocalDateDeserializer extends JsonDeserializer<LocalDate> {

    private final static DateTimeFormatter DATETIME_FORMAT = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @Override
    public LocalDate deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        if (jp.hasCurrentToken()) {
            try {
                LocalDate dateTime = LocalDate.parse(jp.getValueAsString(), DATETIME_FORMAT);
                return dateTime;
            } catch (DateTimeParseException e) {
                return null;
            }
        }
        return null;
    }
}