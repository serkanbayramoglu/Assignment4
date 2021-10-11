package com.example.kitchenstorybackendmongodb.entity;

import org.springframework.data.annotation.Id;

public class UserPasswords {

	@Id
	public String id;
	
	private String username;
	private String password;
	private String firstname;
	private String lastname;
	private String role;
	
	public UserPasswords() {}



	public UserPasswords(String username, String password, String firstname, String lastname, String role) {
		super();
		this.username = username;
		this.password = password;
		this.firstname = firstname;
		this.lastname = lastname;
		this.role = role;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public String getId() {
		return id;
	}



	@Override
	public String toString() {
		return "UserPasswords [id=" + id + ", username=" + username + ", password=" + password + ", firstname="
				+ firstname + ", lastname=" + lastname + ", role=" + role + "]";
	}


	
	
}
