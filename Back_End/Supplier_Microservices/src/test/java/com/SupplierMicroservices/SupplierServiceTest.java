package com.SupplierMicroservices;


import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;


@SpringBootTest
class SupplierServiceTest {

	@Mock
	private SupplierRepository supplierRepo;

	@InjectMocks
	private SupplierService supplierService;

	@Test
	void showAllSupplierTest() {
		List<Supplier> supplier = new ArrayList<>();

		supplier.add(new Supplier(6L, "Pheno", 90, null, null, 0));
		supplier.add(new Supplier(11L, "Reno", 45, null, null, 0));

		when(supplierRepo.findAll()).thenReturn(supplier);
		List<Supplier> expected = supplierService.showSupplier();
		assertEquals(expected, supplier);
	}
	
	@Test
	public void addSupplierTest() throws ParseException {
		Supplier supplier = new Supplier(1L, "crocine", 10, null, null, 0);
		when(supplierRepo.save(supplier)).thenReturn(supplier);
		assertEquals(supplier, supplierService.saveSupplier(supplier));
	}

	@Test
	void deleteSupplierTest() {
		Supplier supplier = new Supplier(25L, "crocine", 55, null, null, 0);
		when(supplierRepo.findById(supplier.getId())).thenReturn(Optional.of(supplier));
		supplierService.deleteSupplier(supplier.getId());
		verify(supplierRepo).deleteById(supplier.getId());
	}

//	@Test
//	public void findByIdTest() {
//		Supplier supplier = new Supplier(25L, "crocine", 55, null, null, 0);
//		supplierService.saveSupplier(supplier);
//		
//		verify(supplierRepo).findById(supplier.getId());
//	}
	
	@Test
	public void updateSupplierTest() {
		Supplier supplier = new Supplier(1L, "crocine", 55, null, null, 0);
		supplierService.saveSupplier(supplier);
		supplier.setId(1L);
		supplier.setName("VitB");
		supplier.setDrugPrice(55);
		supplierService.updateSupplier(supplier );
		Assertions.assertThat(supplier.getName()).isEqualTo("VitB");
	}




}
