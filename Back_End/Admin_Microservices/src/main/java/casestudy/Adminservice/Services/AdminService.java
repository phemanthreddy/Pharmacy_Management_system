
package casestudy.Adminservice.Services;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import casestudy.Adminservice.Repository.AdminRepository;
import casestudy.Adminservice.model.AdminModel;

@Service
public class AdminService implements UserDetailsService {

	@Autowired
	private AdminRepository adminRepository;

	@Override
	public UserDetails loadUserByUsername(String adminname) throws UsernameNotFoundException {
		AdminModel foundedUser = adminRepository.findByAdminname(adminname);

		if (foundedUser == null)
			return null;
		String name = foundedUser.getAdminname();
		String pwd = foundedUser.getPassword();
		return new User(name, pwd, new ArrayList<>());

	}
}
