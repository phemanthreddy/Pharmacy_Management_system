package com.OrdersMicroservices;

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
@RequestMapping("/orders")

public class OrdersController {
	
	@Autowired
	private OrdersService ordersService;

	@PostMapping("/addOrders")
	public Orders addOrders(@RequestBody Orders orders){
		return ordersService.saveOrders(orders);
	}
	
	@GetMapping("/viewOrders")
	public List<Orders> viewOrders() {
		return ordersService.showOrders();
	}
	
	@GetMapping("/viewOrders/{id}")
	public Optional<Orders> viewordersById(@PathVariable(value="id") long id) {
		return ordersService.findByid(id);
	}
	
	@DeleteMapping("/deleteOrders/{id}")
	public Map<String,Orders> delete(@PathVariable(value="id") long id)
	{
		Optional<Orders> orders = ordersService.findByid(id);
		ordersService.deleteOrders(id);
		Map<String,Orders> response = new HashMap<>();
		response.put("Deleted", orders.get());
		return response;
	}
	
}
