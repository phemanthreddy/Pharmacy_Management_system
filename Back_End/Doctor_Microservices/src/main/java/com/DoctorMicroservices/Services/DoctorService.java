
package com.DoctorMicroservices.Services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.DoctorMicroservices.Repository.DoctorRepository;
import com.DoctorMicroservices.model.DoctorModel;



@Service
public class DoctorService implements UserDetailsService{

	@Autowired
	private DoctorRepository doctorRepository;
	
	@Override
	public UserDetails loadUserByUsername(String doctorname) throws UsernameNotFoundException {
		DoctorModel foundedUser = doctorRepository.findByDoctorname(doctorname);
		
		if(foundedUser==null)
			return null;
		String name = foundedUser.getDoctorname();
		String pwd = foundedUser.getPassword();
		return new User(name,pwd,new ArrayList<>());
	
	}
}
