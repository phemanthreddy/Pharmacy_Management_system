package casestudy.Adminservice.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Pickup")
public class Pickup {
	
	@Id
	private long id;
	private String drugName;
	private long drugPrice;

	public Pickup() {
		super();
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

	public long getDrugPrice() {
		return drugPrice;
	}

	public void setDrugPrice(long drugPrice) {
		this.drugPrice = drugPrice;
	}

	public Pickup(long id, String drugName, long drugPrice) {
		super();
		this.id = id;
		this.drugName = drugName;
		this.drugPrice = drugPrice;
	}
	
	
	
	
}
