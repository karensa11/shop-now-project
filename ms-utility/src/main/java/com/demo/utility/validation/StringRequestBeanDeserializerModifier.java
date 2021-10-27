package com.demo.utility.validation;


import com.fasterxml.jackson.databind.BeanDescription;
import com.fasterxml.jackson.databind.DeserializationConfig;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.deser.BeanDeserializerModifier;

public class StringRequestBeanDeserializerModifier extends BeanDeserializerModifier {
    
    @Override
    public JsonDeserializer<?> modifyDeserializer(DeserializationConfig dc, BeanDescription bd, JsonDeserializer<?> deserializer) {
        if (String.class.equals(bd.getBeanClass())) {
            return new StringDelegatingDeserializer(deserializer);
        }
        return super.modifyDeserializer(dc, bd, deserializer);
    }
}