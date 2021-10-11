package com.example.kitchenstorybackendmongodb.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.kitchenstorybackendmongodb.entity.UserPasswords;

public interface UserPasswordsRepository extends MongoRepository<UserPasswords, String>{

	public UserPasswords findByUsername(String username);

}
