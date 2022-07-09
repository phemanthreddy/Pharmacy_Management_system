package com.DoctorMicroservices.Controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.DoctorMicroservices.Repository.DoctorRepository;
import com.DoctorMicroservices.Services.DoctorService;
import com.DoctorMicroservices.Services.JwtUtils;
import com.DoctorMicroservices.model.AuthenticationRequest;
import com.DoctorMicroservices.model.AuthenticationResponse;
import com.DoctorMicroservices.model.DoctorModel;


@CrossOrigin("*")
@RestController
public class DoctorController {
	
@Autowired
private DoctorRepository doctorRepository;

@Autowired
private DoctorService doctorService;

@Autowired
private JwtUtils jwtUtils;

@Autowired
private PasswordEncoder bCryptPasswordEncoder;

@Autowired
private AuthenticationManager authenticationManager;
//---------------------------Registration and Login -------------------------------//


@GetMapping("/finddoctor")
public List<DoctorModel> getdoctor() {
	return doctorRepository.findAll();
}
	
@PostMapping("/reg")
	private ResponseEntity<?> subscribeClient(@RequestBody AuthenticationRequest authenticationRequest)
	{
		String doctorname = authenticationRequest.getDoctorname();
		String password = authenticationRequest.getPassword();
		String emailid = authenticationRequest.getEmailid();
		String contactno = authenticationRequest.getContactno();
		
		String enpwd = bCryptPasswordEncoder.encode(password);
		
		DoctorModel doctorModel = new DoctorModel();
        doctorModel.setDoctorname(doctorname);
        doctorModel.setPassword(enpwd);
        doctorModel.setContactno(contactno);
        doctorModel.setEmailid(emailid);
        try {
        	doctorRepository.save(doctorModel);
		}


		catch (Exception e)
		{
			return ResponseEntity.ok(new AuthenticationResponse("Error During Auth for Doctor "+ doctorname));
		}
		return ResponseEntity.ok(new AuthenticationResponse("Successful Auth " + doctorname));
	}
	@PostMapping("/auth")
	private ResponseEntity<?> authenticateClient(@RequestBody AuthenticationRequest authenticationRequest)
	{
		String doctorname = authenticationRequest.getDoctorname();
		String password = authenticationRequest.getPassword();

//--------------------------------CRUD Operations----------------------//
	try {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(doctorname, password));
	} catch (Exception e) {
		return ResponseEntity.ok(new AuthenticationResponse("Error while authenticating " + doctorname));
	}
	UserDetails loadedUser = doctorService.loadUserByUsername(doctorname);
	String generatedToken = jwtUtils.generateToken(loadedUser);
	return ResponseEntity.ok(new AuthenticationResponse(generatedToken));
}

}