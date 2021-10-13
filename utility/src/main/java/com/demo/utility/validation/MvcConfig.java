package com.demo.utility.validation;

import java.util.List;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.module.SimpleModule;

@Configuration
@EnableWebMvc
public class MvcConfig implements WebMvcConfigurer {

	/*
	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(new RequestsHandlerInterceptorAdapterConfig());
	}
	 */

	@Override
	public void extendMessageConverters(List<HttpMessageConverter<?>> converters) {
		for (HttpMessageConverter<?> converter : converters) {
			if (converter instanceof MappingJackson2HttpMessageConverter) {
				MappingJackson2HttpMessageConverter jacksonMessageConverter = 
						(MappingJackson2HttpMessageConverter) converter;

				ObjectMapper objectMapper = jacksonMessageConverter.getObjectMapper();
				SimpleModule simpleModule = new SimpleModule();
				simpleModule.setDeserializerModifier(new StringRequestBeanDeserializerModifier());
				objectMapper.registerModule(simpleModule);

				break;
			}
		}
	}
}