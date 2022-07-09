package com.SupplierMicroservices;


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

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/supplier")

public class SupplierController {
	
	@Autowired
	private SupplierService supplierService;

	@PostMapping("/addSupplier")
	public Supplier addSupplier(@RequestBody Supplier supplier)
	{
		return supplierService.saveSupplier(supplier);
	}
	
	
	@GetMapping("/viewSuppliers")
	public List<Supplier> viewSupplier() {
		return supplierService.showSupplier();
	}
	
	
	@GetMapping("/viewSupplier/{id}")
	public Optional<Supplier> viewSupplierById(@PathVariable(value="id") long id) {
		return supplierService.findByid(id);
	}
	
	@PutMapping("/updateSupplier/{id}")
	public Supplier updateSupplier(@PathVariable(value="id")long id,@RequestBody Supplier supplier){
		Optional<Supplier> oldsupplier = supplierService.findByid(id);
		oldsupplier=Optional.ofNullable(supplier);
		oldsupplier.get().setId(id);
		supplierService.saveSupplier(oldsupplier.get());
		return oldsupplier.get();
	}

	@DeleteMapping("/deleteSupplier/{id}")
	public Map<String,Supplier> deleteSupplier(@PathVariable(value="id") long id)
	{
		Optional<Supplier> drug = supplierService.findByid(id);
		supplierService.deleteSupplier(id);
		Map<String,Supplier> response = new HashMap<>();
		response.put("Deleted", drug.get());
		return response;
		
	
	}
}
