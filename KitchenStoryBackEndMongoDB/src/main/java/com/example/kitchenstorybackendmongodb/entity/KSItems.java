package com.example.kitchenstorybackendmongodb.entity;

import org.springframework.data.annotation.Id;

public class KSItems {
	
	@Id
	public String id;
	
	private String code;
	private String category;
	private String item;
	private String brand;
	private String size;
	private String price;
	private String unit;
	private String quantity;
	
	public KSItems() {}

	public KSItems(String code, String category, String item, String brand, String size, String price, String unit,
			String quantity) {
		super();
		this.code = code;
		this.category = category;
		this.item = item;
		this.brand = brand;
		this.size = size;
		this.price = price;
		this.unit = unit;
		this.quantity = quantity;
	}

	public String getCode() {
		return code;
	}

	public String getId() {
		return id;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getItem() {
		return item;
	}

	public void setItem(String item) {
		this.item = item;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	@Override
	public String toString() {
		return "KSItems [id=" + id + ", code=" + code + ", category=" + category + ", item=" + item + ", brand=" + brand
				+ ", size=" + size + ", price=" + price + ", unit=" + unit + ", quantity=" + quantity + "]";
	}
	
	

}
