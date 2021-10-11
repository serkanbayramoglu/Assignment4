import { createOutput } from '@angular/compiler/src/core';
import { Component, OnInit, ɵɵqueryRefresh } from '@angular/core';
import { Router } from '@angular/router';
import { CartItems } from '../cartItems';
import { CartserviceService } from '../cartservice.service';
import { Ksitems } from '../ksitems';
import { KSitemsHttpServiceService } from '../ksitems-http-service.service';

@Component({
  selector: 'app-maincomp',
  templateUrl: './maincomp.component.html',
  styleUrls: ['./maincomp.component.css'] 
})

export class MaincompComponent implements OnInit {
  flagquery : boolean = false;
  flagqueryQuery : boolean = false;
  flagqueryItems : boolean = false;
  public itemsFromService : Array<Ksitems> | undefined;
  public categoryItemsFromService : any[] = []
  selectedcat = []
  items = []
  selectedItems = []
  queryItems = []
  queryResults = []

  retrieveallitems(){
    this.itemsFromService = [];
    this.kSitemsHttpServiceService.getbyItem(this.queryItems).subscribe(data => this.itemsFromService = data);
    this.flagquery = true;
  }

  showItemList(){
    this.items = []
    this.flagqueryItems = true;
    for (const scat in this.selectedcat) {
      for (const catit in this.categoryItemsFromService) {
        if (this.categoryItemsFromService[catit].category == this.selectedcat[scat]) {
          this.items =  this.items.concat(this.categoryItemsFromService[catit].item);
        }
      }
    }    
  }

  showQueryBtn(){
    this.queryItems = []
    for (const scat in this.selectedItems) {
      this.queryItems =  this.queryItems.concat(this.selectedItems[scat]);
    }
    this.flagqueryQuery = true;    
  }

  constructor(private kSitemsHttpServiceService : KSitemsHttpServiceService, 
    private cartserviceService : CartserviceService,
    private router:Router) { }

  ngOnInit(): void {
    this.kSitemsHttpServiceService.getCategoryItems().subscribe(data => this.categoryItemsFromService = data)
  }

  addToCart(frm: any){
    let newCartItems : Array<CartItems> = []
    if (this.itemsFromService?.length != null) {
      for (var count of this.itemsFromService) {
        if (frm.form.value[count.code] > 0) {
          newCartItems.push({
            id: count.id , 
            icode: count.code, 
            category: count.category,
            item:  count.item,
            brand:  count.brand,
            size:  count.size,
            price:  parseFloat(count.price),
            unit:  count.unit,
            quantity:  parseInt(count.quantity),
            selectedQuantity: frm.form.value[count.code],
            total: (frm.form.value[count.code])*(parseFloat(count.price))
          })
        }        
      }
    }

    let existingCartItems = this.cartserviceService.getCartItems()

    if (existingCartItems.length > 0) {
      for (const itemNew of newCartItems){
        let check : boolean = false
        for (const itemExst of existingCartItems){  
          if (itemNew.icode == itemExst.icode) {
            itemExst.selectedQuantity =  itemExst.selectedQuantity + itemNew.selectedQuantity 
            itemExst.total = (itemExst.selectedQuantity)*(itemExst.price)
            check = true
          }
          if (check) {break}
        }
        if (!check) {
           existingCartItems.push(itemNew) 
        }
      }
    } else  { 
      this.cartserviceService.setCartItems(newCartItems)
    }
    this.router.navigate(['/cartcomp']);
  }

  minofdata(itemCode: string, num1s: string) {
    let item = this.cartserviceService.getCartItem(itemCode) 
    let numDeduct = 0
    let num1 = parseInt(num1s)
    if (item != null) {
      numDeduct = item.selectedQuantity
    }
    let minvalue = (num1 - numDeduct)
    if (24 < num1) {minvalue = (24 - numDeduct)}
    return minvalue
  }
  
}






