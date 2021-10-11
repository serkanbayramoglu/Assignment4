package com.example.kitchenstorybackendmongodb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.kitchenstorybackendmongodb.entity.ResponseItems;
import com.example.kitchenstorybackendmongodb.entity.UserPasswords;
import com.example.kitchenstorybackendmongodb.repository.UserPasswordsRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class UserPasswordsController {

	@Autowired
	private UserPasswordsRepository repository;
	
    @GetMapping("/KSAdmin/{userdetails}")
    public ResponseItems userActions (@PathVariable String[] userdetails ) {
    	UserPasswords userPass = (UserPasswords) repository.findByUsername(userdetails[0]);
    	ResponseItems responseItem = new ResponseItems("invalid");

    	if (userdetails.length == 2) {
	    	if (userPass.getPassword().equals(userdetails[1])) {
	    		responseItem.setResponse(userPass.getRole());
	    	} 
    	} else {
    		if (userdetails.length == 3) {
    	    	if (userPass.getPassword().equals(userdetails[1])) {
    	    		userPass.setPassword(userdetails[2]);
    	    	    try {
	    	    		repository.save(userPass);
	    	    		responseItem.setResponse(userPass.getRole());
    	    	    } catch (Exception e) {
        	    		responseItem.setResponse("Exception");
    	    	    }
    	    	} 
    		}
    	}
    	
    	return responseItem;
    }
    
    @GetMapping("/KSAdmin/")
    public List<UserPasswords> getUsers() {
        return (List<UserPasswords>) repository.findAll();
    }
    
    @PostMapping("/KSAdmin/")
    public String changePassword(@RequestBody String uname, String pword, String newpword) {
    	UserPasswords userPass = repository.findByUsername(uname);
    	String response = "Password could not be changed";
    	if (userPass.getPassword().equals(pword)) {
    		userPass.setPassword(newpword);
        	repository.save(userPass);
        	response = "Password changed successfully";
    	}
    	return response;
    }
	
}
