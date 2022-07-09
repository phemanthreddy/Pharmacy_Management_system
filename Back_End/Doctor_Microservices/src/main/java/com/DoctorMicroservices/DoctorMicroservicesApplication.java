package com.DoctorMicroservices;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.loadbalancer.LoadBalanced;
import org.springframework.context.annotation.Bean;
import org.springframework.web.client.RestTemplate;

@SpringBootApplication
public class DoctorMicroservicesApplication {

	public static void main(String[] args) {
		SpringApplication.run(DoctorMicroservicesApplication.class, args);
	}
	@Bean
	@LoadBalanced
	public RestTemplate  getRestTemplate() {
		return new RestTemplate();
	}
	

}

	
	
	