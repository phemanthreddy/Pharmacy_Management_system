package com.PickupMicroservice;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/pickup")

public class PickupController {
	
	@Autowired
	private PickupService pickupService;

	@PostMapping("/addPickup")
	public Pickup addPickup(@RequestBody Pickup pickup){
		return pickupService.savePickup(pickup);
	}
	
	@GetMapping("/viewPickup")
	public List<Pickup> viewPickup() {
		return pickupService.showPickup();
	}
	
	@GetMapping("/viewPickup/{id}")
	public Optional<Pickup> viewpickupById(@PathVariable(value="id") long id) {
		return pickupService.findByid(id);
	}
	
	@DeleteMapping("/deletePickup/{id}")
	public Map<String,Pickup> delete(@PathVariable(value="id") long id)
	{
		Optional<Pickup> pickup = pickupService.findByid(id);
		pickupService.deletePickup(id);
		Map<String,Pickup> response = new HashMap<>();
		response.put("Deleted", pickup.get());
		return response;
	}
	
}
