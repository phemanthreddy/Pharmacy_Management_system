package com.spring.ApiGateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.context.annotation.Bean;

import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

@SpringBootApplication
@EnableEurekaClient
public class ApiGatewayMicroservicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiGatewayMicroservicesApplication.class, args);
	}
	
	

	@Bean
	public Docket swaggerConfig()
	{
		return new Docket(DocumentationType.SWAGGER_2)//step (1)it is just creating new Docket instance of ducument type that is configured to use swagger2
	               .select() 
	               .apis(RequestHandlerSelectors.basePackage("com.spring.ApiGateway"))//(4) giving thebase pakage //both 3 and 4 will eliminate the 1st problem
	               .build();
	}
	

}
