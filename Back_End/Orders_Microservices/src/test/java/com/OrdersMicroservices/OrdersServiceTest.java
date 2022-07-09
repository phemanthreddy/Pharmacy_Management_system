package com.OrdersMicroservices;


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
class OrdersServiceTest {

	@Mock
	private OrdersRepository ordersRepo;

	@InjectMocks
	private OrdersService ordersService;

	@Test
	void showAllOrdersTest() {
		List<Orders> orders = new ArrayList<>();

		orders.add(new Orders(6L, "Pheno", 90));
		orders.add(new Orders(11L, "Reno", 45));

		when(ordersRepo.findAll()).thenReturn(orders);
		List<Orders> expected = ordersService.showOrders();
		assertEquals(expected, orders);
	}
	
	@Test
	public void addOrdersTest() throws ParseException {
		Orders orders = new Orders(1L, "crocine", 10);
		when(ordersRepo.save(orders)).thenReturn(orders);
		assertEquals(orders, ordersService.saveOrders(orders));
	}

	@Test
	void deleteOrdersTest() {
		Orders orders = new Orders(25L, "crocine", 55);
		when(ordersRepo.findById(orders.getId())).thenReturn(Optional.of(orders));
		ordersService.deleteOrders(orders.getId());
		verify(ordersRepo).deleteById(orders.getId());
	}





}
