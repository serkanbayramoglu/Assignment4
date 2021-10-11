package com.example.kitchenstorybackendmongodb.controller;

import java.util.Comparator;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.kitchenstorybackendmongodb.entity.KSCategoryItems;
import com.example.kitchenstorybackendmongodb.entity.KSItems;
import com.example.kitchenstorybackendmongodb.repository.KSItemsRepository;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class KSItemsController {

    
	@Autowired
	private KSItemsRepository repository;
		
    @GetMapping("/KS")
    public List<KSItems> getItems() {
        return (List<KSItems>) repository.findAll();
    }
    
    @GetMapping("/KS/item/{itemlist}")
    public List<KSItems> getItemsAll (@PathVariable String[] itemlist) {
    	List<KSItems> list = null;
    	for (String it : itemlist) {
    		List<KSItems> newlist = (List<KSItems>) repository.findByItem(it);
    		if (list == null) {
    			list = newlist;
    		} else {
        		list.addAll(newlist);
    		}
    	}
    	list.sort(Comparator.comparing(KSItems::getCode));
    return list;
    }
    
    @GetMapping("/KS/code/{code}")
    public KSItems getItem (@PathVariable String code) {

    	KSItems list = (KSItems) repository.findByCode(code);

    return list;
    }
    
    @GetMapping("/KSCategories")
    public Set<String> getCategories() {
        return (Set<String>) repository.findAllCategories();
    }
    
    @GetMapping("/KSCatItems")
    public List<KSCategoryItems> getCategoryItems() {
    	List<KSCategoryItems> list = (List<KSCategoryItems>) repository.findAllCategoryItems();
    	list.sort(Comparator.comparing(KSCategoryItems::getCategory));
    	return list;
    }

    @PostMapping("/KS")
    void addUpdateItems(@RequestBody List<KSItems> kSItems) {

    	for (KSItems item : kSItems) {
    		KSItems newData = null;
    		try {
    	    	newData = repository.findByCode(item.getCode());
    		} catch (Exception e) {}
    		if (newData == null) {
    			newData = new KSItems("0","0","0","0","0","0","0","0");
    		}
    	    newData.setCode(item.getCode());
    	    newData.setCategory(item.getCategory());
    	    newData.setItem(item.getItem());
    	    newData.setBrand(item.getBrand());
    	    newData.setSize(item.getSize());
    	    newData.setPrice(item.getPrice());
    	    newData.setUnit(item.getUnit());
    	    newData.setQuantity(item.getQuantity());
    	    repository.save(newData);
    	}
    }
    
    @PostMapping("/KSDelete")
    void deleteItems(@RequestBody KSItems kSItem) {

    		KSItems newData = null;
    		try {
    	    	newData = repository.findByCode(kSItem.getCode());
        	    repository.delete(newData);
    		} catch (Exception e) {}    	
    }
    
}
