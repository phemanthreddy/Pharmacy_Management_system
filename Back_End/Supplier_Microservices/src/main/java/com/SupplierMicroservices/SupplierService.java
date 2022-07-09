package com.SupplierMicroservices;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

@Service
public class SupplierService {
	
	@Autowired
	private SupplierRepository supplierRepo;
	
	public List<Supplier> showSupplier() {
		return supplierRepo.findAll();
	}

	public Supplier saveSupplier(Supplier supplier) {
		
			return supplierRepo.save(supplier);
	}

	public Supplier updateSupplier(Supplier supplier) {
		return supplierRepo.save(supplier);
	}

	public void deleteSupplier(long id) {
		
		supplierRepo.deleteById(id);
		
	}


	public Optional<Supplier> findByid(long id) {
			return supplierRepo.findById(id);
		
	}

	
	
}