package com.demo.utility.validation;


import java.io.IOException;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.deser.std.DelegatingDeserializer;

public class StringDelegatingDeserializer extends DelegatingDeserializer {
	private static final long serialVersionUID = 1L;
	private final StringRequestCustomDeserializer requestCustomDeserializer = new StringRequestCustomDeserializer();
    
    public StringDelegatingDeserializer(JsonDeserializer<?> defaultJsonDeserializer) {
        super(defaultJsonDeserializer);
    }
    
    @Override
    public Object deserialize(JsonParser jp, DeserializationContext dc) throws IOException {
        return requestCustomDeserializer.deserialize(jp);
    }
    
    @Override
    protected JsonDeserializer<?> newDelegatingInstance(JsonDeserializer<?> jsonDeserializer) {
        return jsonDeserializer;
    }
}
