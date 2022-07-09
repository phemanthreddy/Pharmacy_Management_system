package com.DoctorMicroservices.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document (collection = "Doctor")
public class DoctorModel {
	 
		@Id
		private String id;
		private String doctorname;
		private String password;
		private String emailid;
		private String contactno;
		public String getId() {
			return id;
		}
		public void setId(String id) {
			this.id = id;
		}
		public String getDoctorname() {
			return doctorname;
		}
		public void setDoctorname(String doctorname) {
			this.doctorname = doctorname;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public String getEmailid() {
			return emailid;
		}
		public void setEmailid(String emailid) {
			this.emailid = emailid;
		}
		public String getContactno() {
			return contactno;
		}
		public void setContactno(String contactno) {
			this.contactno = contactno;
		}
		public DoctorModel() {
			
		}
	}
