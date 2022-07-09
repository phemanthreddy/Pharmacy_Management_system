package com.OrdersMicroservices;


import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
class OrdersRepositoryTest {

	@Autowired
	private OrdersRepository OrdersRepo;
	
	 @BeforeEach
	    void initUseCase() {
		 Orders orders = new Orders(201L, "xyz", 45);
		 OrdersRepo.save(orders);
	    }

	    @AfterEach
	    public void destroyAll(){
	    	OrdersRepo.deleteById(201L);
	    }
	


}
