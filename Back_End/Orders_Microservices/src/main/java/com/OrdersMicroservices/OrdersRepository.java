package com.OrdersMicroservices;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrdersRepository extends MongoRepository<Orders, Long> {

}
