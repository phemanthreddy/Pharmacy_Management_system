package casestudy.Adminservice.Controller;

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

import casestudy.Adminservice.Repository.AdminRepository;
import casestudy.Adminservice.Services.JwtUtils;
import casestudy.Adminservice.Services.AdminService;
import casestudy.Adminservice.model.AdminModel;
import casestudy.Adminservice.model.AuthenticationRequest;
import casestudy.Adminservice.model.AuthenticationResponse;

@CrossOrigin("*")
@RestController
public class AdminController {
	
@Autowired
private AdminRepository adminRepository;

@Autowired
private AdminService adminService;

@Autowired
private JwtUtils jwtUtils;

@Autowired
private PasswordEncoder bCryptPasswordEncoder;

@Autowired
private AuthenticationManager authenticationManager;

					//---------------------------Find Admins -------------------------------//

@GetMapping("/findadmin")
public List<AdminModel> getadmin() {
	return adminRepository.findAll();
}
					//---------------------------Registration -------------------------------//

@PostMapping("/reg")
	private ResponseEntity<?> subscribeClient(@RequestBody AuthenticationRequest authenticationRequest)
	{
		String adminname = authenticationRequest.getAdminname();
		String password = authenticationRequest.getPassword();
		String emailid = authenticationRequest.getEmailid();
		String contactno = authenticationRequest.getContactno();
		
		String enpwd = bCryptPasswordEncoder.encode(password);
		
		AdminModel adminModel = new AdminModel();
        adminModel.setAdminname(adminname);
        adminModel.setPassword(enpwd);
        adminModel.setContactno(contactno);                 
        adminModel.setEmailid(emailid);
        try {
        	adminRepository.save(adminModel);
		}


		catch (Exception e)
		{
			return ResponseEntity.ok(new AuthenticationResponse("Error During Auth for Admin "+ adminname));
		}
		return ResponseEntity.ok(new AuthenticationResponse("Successful Auth " + adminname));
	}

				//--------------------------------Authentication----------------------//

	@PostMapping("/auth")
	private ResponseEntity<?> authenticateClient(@RequestBody AuthenticationRequest authenticationRequest)
	{
		String adminname = authenticationRequest.getAdminname();
		String password = authenticationRequest.getPassword();

	try {
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(adminname, password));
	} catch (Exception e) {
		return ResponseEntity.ok(new AuthenticationResponse("Error while authenticating " + adminname));
	}
	UserDetails loadedUser = adminService.loadUserByUsername(adminname);
	String generatedToken = jwtUtils.generateToken(loadedUser);
	return ResponseEntity.ok(new AuthenticationResponse(generatedToken));
}

}