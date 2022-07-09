package casestudy.Adminservice.model;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Supplier")
public class Supplier {
	
	@Id
	private long id;
	private String name;
	private long phoneNumber;
	private String email;
	private String drugName;
	private long drugPrice;

	public Supplier() {
		super();
	}

	public Supplier(long id, String name, long phoneNumber, String email, String drugName, long drugPrice) {
		super();
		this.id = id;
		this.name = name;
		this.phoneNumber = phoneNumber;
		this.email = email;
		this.drugName = drugName;
		this.drugPrice = drugPrice;
	}
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public long getPhoneNumber() {
		return phoneNumber;
	}
	public void setPhoneNumber(long phoneNumber) {
		this.phoneNumber = phoneNumber;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getDrugName() {
		return drugName;
	}
	public void setDrugName(String drugName) {
		this.drugName = drugName;
	}
	public long getDrugPrice() {
		return drugPrice;
	}
	public void setDrugPrice(long drugPrice) {
		this.drugPrice = drugPrice;
	}
	

}