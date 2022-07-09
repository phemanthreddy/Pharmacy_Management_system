package com.DrugInventoryMicroservice;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.DrugInventoryMicroservice.models.Drug;
import com.DrugInventoryMicroservice.repository.DrugRepository;


@SpringBootTest
class DrugRepositoryTest {

	@Autowired
	private DrugRepository drugRepo;
	
	 @BeforeEach
	    void initUseCase() {
		 Drug drug = new Drug(201L, "xyz", 45);
		 drugRepo.save(drug);
	    }

	    @AfterEach
	    public void destroyAll(){
	    	drugRepo.deleteById(201L);
	    }
	


}
