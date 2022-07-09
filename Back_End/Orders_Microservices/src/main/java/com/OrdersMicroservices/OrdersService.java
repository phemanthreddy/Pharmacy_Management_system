package com.OrdersMicroservices;


import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;



@Service
public class OrdersService {
	
	
	@Autowired
	private OrdersRepository ordersRepo;

	public List<Orders> showOrders() {
		return ordersRepo.findAll();
	}

	public Orders saveOrders(Orders orders) {
		
			return ordersRepo.save(orders);
	}
	
	public void deleteOrders(long id) {
		
		ordersRepo.deleteById(id);
		
	}

//	public Drug searchByName(String name) {
//		Drug drug1 = drugRepo.findByName(name);
//	
//			return drug1;
//	}

	public Optional<Orders> findByid(long id) {
			return ordersRepo.findById(id);
		
	}
}
