package com.example.kitchenstorybackendmongodb.entity;

import org.springframework.data.annotation.Id;

public class ResponseItems {

	@Id
	private String response;

	public ResponseItems() {}

	public ResponseItems(String response) {
		super();
		this.response = response;
	}

	public String getResponse() {
		return response;
	}

	public void setResponse(String response) {
		this.response = response;
	}

	@Override
	public String toString() {
		return "ResultItems [response=" + response + "]";
	}
	
}
