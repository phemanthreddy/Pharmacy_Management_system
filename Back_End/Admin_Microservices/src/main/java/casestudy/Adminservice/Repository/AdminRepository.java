package casestudy.Adminservice.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import casestudy.Adminservice.model.AdminModel;

@Repository
public interface AdminRepository extends MongoRepository<AdminModel,String> {
         AdminModel findByAdminname(String adminname);
}
