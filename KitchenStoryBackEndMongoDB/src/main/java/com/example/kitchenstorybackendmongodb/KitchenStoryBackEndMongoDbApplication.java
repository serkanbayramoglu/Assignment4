package com.example.kitchenstorybackendmongodb;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.kitchenstorybackendmongodb.entity.KSItems;
import com.example.kitchenstorybackendmongodb.entity.UserPasswords;
import com.example.kitchenstorybackendmongodb.repository.KSItemsRepository;
import com.example.kitchenstorybackendmongodb.repository.UserPasswordsRepository;


@SpringBootApplication
public class KitchenStoryBackEndMongoDbApplication implements CommandLineRunner {

	@Autowired
	private KSItemsRepository ksrepository;
	
	@Autowired
	private UserPasswordsRepository uprepository;
	
	public static void main(String[] args) {
		SpringApplication.run(KitchenStoryBackEndMongoDbApplication.class, args);
	}
	
	@Override
	public void run(String... args) throws Exception {
	    
		// reset databases
		ksrepository.deleteAll();
		uprepository.deleteAll();
		
		// save an admin 
	    uprepository.save(new UserPasswords("admin","pass","John","Smith","admin"));
		
	    // fetch all admins
	    System.out.println();
	    System.out.println("UserPasswords found with findAll():");
	    System.out.println("--------------------------------------");
	    for (UserPasswords userPassword : uprepository.findAll()) {
	      System.out.println(userPassword);
	    }
	    System.out.println();
		
		
		// save a couple of customers
	    ksrepository.save(new KSItems("10001","Poultry","Whole Chicken","Camfit","Regular","3.50","per kg","10"));
	    ksrepository.save(new KSItems("10002","Poultry","Chicken Tigh","Camfit","Regular","5.50","per kg","30"));
	    ksrepository.save(new KSItems("10003","Poultry","Chicken Breast","Camfit","Regular","4.50","per kg","10"));
	    ksrepository.save(new KSItems("10004","Poultry","Egg","Camfit","Regular","5.25","per pack","5"));
	    ksrepository.save(new KSItems("10005","Poultry","Whole Chicken","Tonrit","Regular","3.50","per kg","40"));
	    ksrepository.save(new KSItems("10006","Poultry","Chicken Tigh","Tonrit","Large","4.50","per kg","30"));
	    ksrepository.save(new KSItems("10007","Poultry","Chicken Breast","Tonrit","Small","3.50","per kg","25"));
	    ksrepository.save(new KSItems("10008","Poultry","Egg","Tonrit","Regular","4.50","per pack","40"));
	    ksrepository.save(new KSItems("10009","Bakery","White Bread","BreadCo","Regular","1.50","per piece","60"));
	    ksrepository.save(new KSItems("10010","Bakery","Brown Bread","BreadCo","Regular","2.10","per piece","20"));
	    ksrepository.save(new KSItems("10011","Bakery","White Bread","BriCo","Regular","1.90","per piece","30"));
	    ksrepository.save(new KSItems("10012","Bakery","Brown Bread","BriCo","Regular","2.50","per piece","50"));
	    ksrepository.save(new KSItems("10013","Fats and Oils","Butter","BriCo","Regular","4.40","per piece","40"));
	    ksrepository.save(new KSItems("10014","Fats and Oils","Butter","BriCo","Large","6.50","per piece","90"));
	    ksrepository.save(new KSItems("10015","Fats and Oils","Vegetable Oil","BriCo","Regular","6.20","per piece","80"));


	}

}
