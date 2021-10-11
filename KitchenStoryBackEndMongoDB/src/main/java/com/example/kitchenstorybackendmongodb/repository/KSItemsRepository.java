package com.example.kitchenstorybackendmongodb.repository;

import java.util.List;


import java.util.Set;

import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.kitchenstorybackendmongodb.entity.KSCategoryItems;
import com.example.kitchenstorybackendmongodb.entity.KSItems;


public interface KSItemsRepository extends MongoRepository<KSItems, String>{

	public List<KSItems> findByItem(String item);
	
	public KSItems findByCode(String code);
	
	public List<KSItems> findByCategoryAndItem(String category, String item);
	
	@Aggregation("{ '$project': { '_id' : '$category' } }")
	public Set<String> findAllCategories();

	@Aggregation("{ $group: { '_id' : '$category', 'item' : { $addToSet : $item } } }")
	public List<KSCategoryItems> findAllCategoryItems();
	
	
	
}
