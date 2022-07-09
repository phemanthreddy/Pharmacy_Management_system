package com.SupplierMicroservices;


import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
class SupplierRepositoryTest {

	@Autowired
	private SupplierRepository SupplierRepo;
	
	 @BeforeEach
	    void initUseCase() {
		 Supplier supplier = new Supplier(201L, "name", 45, "name@123", "drugname", 0);
		 SupplierRepo.save(supplier);
	    }

	    @AfterEach
	    public void destroyAll(){
	    	SupplierRepo.deleteById(201L);
	    }
	


}
