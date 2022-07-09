package com.DrugInventoryMicroservice.controller;

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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.DrugInventoryMicroservice.Exceptions.DrugAlreadyExistException;
import com.DrugInventoryMicroservice.Exceptions.DrugNotFoundException;
import com.DrugInventoryMicroservice.models.Drug;
import com.DrugInventoryMicroservice.service.DrugService;


@CrossOrigin("*")
@RestController
@RequestMapping("/drug")
public class DrugController {
	
	@Autowired
	private DrugService drugService;

	@PostMapping("/addDrug")
	public Drug addDrug(@RequestBody Drug drugrequest) {
	Optional<Drug> drug = drugService.findByid(drugrequest.getId());
	if(!drug.isPresent()) {
		return drugService.saveDrug(drugrequest);
	}
	else {
		throw new DrugAlreadyExistException("Drug Already exists");
	}
}


	@GetMapping("/viewDrugs")
	public List<Drug> viewDrug() {
		return drugService.showDrugs();
	}
	
	
	@GetMapping("/viewDrug/{id}")
	public Optional<Drug> viewDrugById(@PathVariable(value="id") long id) {
		Optional<Drug> drug= drugService.findByid(id);
		
		if(!drug.isPresent()) {
			throw new DrugNotFoundException("Drug doesnot exist");		
		}
		else {
			return drugService.findByid(id);
		}
	}

	@PutMapping("/updateDrug/{id}")
	public Drug updateDrug(@PathVariable(value="id")long id,@RequestBody Drug drug){
		Optional<Drug> olddrug = drugService.findByid(id);
		olddrug=Optional.ofNullable(drug);
		olddrug.get().setId(id);
		drugService.saveDrug(olddrug.get());
		return olddrug.get();
	}
	
	
	@DeleteMapping("/deleteDrug/{id}")
	public Map<String,Drug> deleteDrug(@PathVariable(value="id") long id)
	{
		Optional<Drug> drug = drugService.findByid(id);
		drugService.deleteDrug(id);
		Map<String,Drug> response = new HashMap<>();
		response.put("Deleted", drug.get());
		return response;
		
		
	}
}
	
	

