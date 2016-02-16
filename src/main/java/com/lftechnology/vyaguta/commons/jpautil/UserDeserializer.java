package com.lftechnology.vyaguta.commons.jpautil;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.lftechnology.vyaguta.commons.pojo.User;

/**
 * 
 * @author Kailash Bijayananda <kailashraj@lftechnology.com>
 *
 */
public class UserDeserializer extends JsonDeserializer<User> {

    @Override
    public User deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        if (jp.hasCurrentToken()) {
            try {
                User user = new User(jp.getValueAsString());
                return user;
            } catch (Exception e) {
                return null;
            }
        }
        return null;
    }
}