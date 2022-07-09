package com.DrugInventoryMicroservice.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.DrugInventoryMicroservice.models.Drug;

public interface DrugRepository extends MongoRepository<Drug, Long>{

}
