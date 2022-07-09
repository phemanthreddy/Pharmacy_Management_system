package com.DoctorMicroservices.Repository;


import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.DoctorMicroservices.model.DoctorModel;


@Repository
public interface DoctorRepository extends MongoRepository<DoctorModel, String> {
    DoctorModel findByDoctorname(String doctorname);
	
}