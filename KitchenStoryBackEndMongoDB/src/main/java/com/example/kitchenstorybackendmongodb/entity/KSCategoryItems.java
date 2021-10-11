package com.example.kitchenstorybackendmongodb.entity;

import java.util.Set;

import org.springframework.data.annotation.Id;

public class KSCategoryItems {
	
	@Id
	private String category;
	
	private Set<String> item;
	
	public KSCategoryItems() {}

	public KSCategoryItems(String category, Set<String> item) {
		super();
		this.category = category;
		this.item = item;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public Set<String> getItem() {
		return item;
	}

	public void setItem(Set<String> item) {
		this.item = item;
	}

	@Override
	public String toString() {
		return "KSCategoryItems [category=" + category + ", item=" + item + "]";
	}



}
