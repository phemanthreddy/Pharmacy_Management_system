package com.PickupMicroservice;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class PickupService {
	
	
	@Autowired
	private PickupRepository pickupRepo;

	public List<Pickup> showPickup() {
		return pickupRepo.findAll();
	}

	public Pickup savePickup(Pickup pickup) {
		
			return pickupRepo.save(pickup);
	}
	
	public void deletePickup(long id) {
		
		pickupRepo.deleteById(id);
		
	}

//	public Drug searchByName(String name) {
//		Drug drug1 = drugRepo.findByName(name);
//	
//			return drug1;
//	}

	public Optional<Pickup> findByid(long id) {
			return pickupRepo.findById(id);
		
	}
}
