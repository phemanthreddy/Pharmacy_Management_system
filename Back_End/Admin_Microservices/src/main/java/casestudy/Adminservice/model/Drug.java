package casestudy.Adminservice.model;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.annotation.Id;

@Document(collection = "Drug")
public class Drug {
	@Id
	private long id;
	private String drugName;
	private long price;
	
	public Drug() {
		super();
	
	}

	public Drug(long id, String drugName, long price) {
		super();
		this.id = id;
		this.drugName = drugName;
		this.price = price;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getDrugName() {
		return drugName;
	}

	public void setDrugName(String drugName) {
		this.drugName = drugName;
	}

	public long getPrice() {
		return price;
	}

	public void setPrice(long price) {
		this.price = price;
	}
	
}