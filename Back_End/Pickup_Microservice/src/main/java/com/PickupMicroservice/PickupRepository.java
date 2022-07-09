package com.PickupMicroservice;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface PickupRepository extends MongoRepository<Pickup, Long> {

}
