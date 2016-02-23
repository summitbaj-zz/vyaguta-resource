package com.lftechnology.vyaguta.commons.jpautil;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.lftechnology.vyaguta.resource.entity.Tag;

/**
 * 
 * @author Achyut Pokhrel <achyutpokhrel@lftechnology.com>
 *
 */
public class TagDeserializer extends JsonDeserializer<Tag> {

    @Override
    public Tag deserialize(JsonParser jp, DeserializationContext ctxt) throws IOException, JsonProcessingException {
        // if(jp.hasCurrentToken()){
        //
        // }
        return null;
    }

}
