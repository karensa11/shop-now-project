package com.demo.utility.validation;


import java.io.IOException;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.JsonNode;

public class StringRequestCustomDeserializer {
    
    public String deserialize(JsonParser jsonParser) throws IOException {
        
        JsonNode jsonNode = jsonParser.getCodec().readTree(jsonParser);
        String element = jsonNode.textValue();
        ValidationUtil.validateBadString(element, false);
        return element;
    }
}