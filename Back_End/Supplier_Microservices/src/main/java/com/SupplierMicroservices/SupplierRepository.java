package com.SupplierMicroservices;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface SupplierRepository extends MongoRepository<Supplier, Long> {

}
