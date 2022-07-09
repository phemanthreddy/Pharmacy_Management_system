package casestudy.Adminservice.Controller;


import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import casestudy.Adminservice.model.Drug;
import casestudy.Adminservice.model.Pickup;
import casestudy.Adminservice.model.Supplier;

@CrossOrigin("*")
@RestController
@RequestMapping("/admin")
public class Controller {
	
	@Autowired
	private RestTemplate restTemplate;

	
	//Drugs 
	
	@GetMapping("/viewDrugs")
	public List<Object> getAllDrugInventoryInfo(){
		
		String url="http://DRUG-INVENTORY/drug/viewDrugs";
		Object[] objects= restTemplate.getForObject(url, Object[].class);
		return Arrays.asList(objects);
	}


	@GetMapping("/viewDrug/{id}")
	public Object getDrugInventoryById(@RequestParam long id){
		
		String url="http://DRUG-INVENTORY/drug/viewDrug/"+id;
		return restTemplate.getForObject(url, Object.class);
		}
	

	@PostMapping("/addDrug")
	public Drug addDrugInventoryInfo(@RequestBody Drug drug ) {

		 return restTemplate.postForObject("http://DRUG-INVENTORY/drug/addDrug", drug, Drug.class);
	}
	

	@PutMapping("/updateDrug/{id}")
	public String updateDrugInventoryInfo(@RequestParam  long id) {
		String url="http://DRUG-INVENTORY/drug/updateDrug/"+id;
		restTemplate.put(null, url);
		return "Data with id '"+id+"' succesfully ";
	}
	

	@DeleteMapping("/deleteDrug/{id}")
	public String deleteDrugInventoryInfoById(@RequestParam long id){
		
		String url="http://DRUG-INVENTORY/drug/deleteDrug/"+id;
		 restTemplate.delete(url);
		 return "Data with id '"+id+"' succesfully deleted";
	}

	//supplier

	@GetMapping("/viewSuppliers")
	public List<Object> getAllSuppliersInventoryInfo(){
		
		String url="http://SUPP-MICROSERVICE/supplier/viewSuppliers";
		Object[] objects= restTemplate.getForObject(url, Object[].class);
		return Arrays.asList(objects);
	}


	@GetMapping("/viewSupplier/{id}")
	public Object getSupplierInventoryById(@RequestParam long id){
		
		String url="http://SUPP-MICROSERVICE/supplier/viewSupplier/"+id;
		return restTemplate.getForObject(url, Object.class);
		}



	@PostMapping("/addSupplier")
	public Supplier addSupplierInventoryInfo(@RequestBody Supplier supplier ) {

		 return restTemplate.postForObject("http://SUPP-MICROSERVICE/supplier/addSupplier", supplier, Supplier.class);
	}
	
	//error
	
	@PutMapping("/updateSupplier/{id}")
	public void updateSupplierInventoryInfo(@RequestBody Supplier supplier) {
		restTemplate.put("http://SUPP-MICROSERVICE/supplier/updateSupplier/", supplier);
	}


	@DeleteMapping("/deleteSupplier/{id}")
	public String deleteSupplierInventoryInfoById(@RequestParam long id){
		
		String url="http://SUPP-MICROSERVICE/supplier/deleteSupplier/"+id;
		 restTemplate.delete(url);
		 return "Data with id '"+id+"' succesfully deleted";
	}

	//orders

	@GetMapping("/viewOrders")
	public List<Object> getAllOrdersInventoryInfo(){
		
		String url="http://ORDER-MICROSERVICE/orders/viewOrders";
		Object[] objects= restTemplate.getForObject(url, Object[].class);
		return Arrays.asList(objects);
	}


	@GetMapping("/viewOrders/{id}")
	public Object getOrdersInventoryById(@RequestParam long id){
		
		String url="http://ORDER-MICROSERVICE/orders/viewOrders/"+id;
		return restTemplate.getForObject(url, Object.class);
		}
	
	
	@DeleteMapping("/deleteOrders/{id}")
	public String deleteOrdersInventoryById(@RequestParam long id){
		
		String url="http://ORDER-MICROSERVICE/orders/deleteOrders/"+id;
		 restTemplate.delete(url);
		 return "Data with id '"+id+"' succesfully deleted";
	}
	
	
	//Pickup
	
	

	@GetMapping("/viewPickup")
	public List<Object> getAllPickupInfo(){
		
		String url="http://Pickup-MICROSERVICE/pickup/viewPickup";
		Object[] objects= restTemplate.getForObject(url, Object[].class);
		return Arrays.asList(objects);
	}


	@GetMapping("/viewPickup/{id}")
	public Object getPickupById(@RequestParam long id){
		
		String url="http://Pickup-MICROSERVICE/pickup/viewPickup/"+id;
		return restTemplate.getForObject(url, Object.class);
		}
	

	@PostMapping("/addPickup")
	public Pickup addPickupInfo(@RequestBody Pickup pickup ) {

		 return restTemplate.postForObject("http://Pickup-MICROSERVICE/pickup/addPickup", pickup, Pickup.class);
	}
	
	

	@DeleteMapping("/deletePickup/{id}")
	public String deletePickupInfoById(@RequestParam long id){
		
		String url="http://Pickup-MICROSERVICE/pickup/deletePickup/"+id;
		 restTemplate.delete(url);
		 return "Data with id '"+id+"' succesfully deleted";
	}
  


}
	


