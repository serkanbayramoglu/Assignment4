import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import { CartItems } from '../cartItems';
import { CartserviceService } from '../cartservice.service';
import { KSitemsHttpServiceService } from '../ksitems-http-service.service';
import { Ksitems } from '../ksitems';


@Component({
  selector: 'app-paycomp',
  templateUrl: './paycomp.component.html',
  styleUrls: ['./paycomp.component.css']
})
export class PaycompComponent implements OnInit {
  total : number = 0;
  shippingcost : number = 0;
  today= new Date();
  todaysDataTime = '';
  paymentresultmessage : string = "";
  flagquery1 : boolean = true;
  flagquery2 : boolean = false;
  paysuccess : boolean = false;
  purchasedItems : Array<CartItems> = []
  remainingItems : Array<Ksitems> = []
  subtotal: number = 0;

  template: `{{ now | date:'HH:mm:ss'}}` = "{{ now | date:'HH:mm:ss'}}";
  
  constructor(private kSitemsHttpServiceService : KSitemsHttpServiceService, private cartserviceService : CartserviceService) {
    this.todaysDataTime = formatDate(this.today, 'dd-MM-yyyy hh:mm a', 'en-US', '+0530');
  }

  ngOnInit(): void {
    this.purchasedItems = this.cartserviceService.getCartItems();
    this.cartCalculations()
  }

  cartCalculations(){
    this.subtotal = 0
    this.shippingcost = 0
    this.total = 0
    for (const item of this.purchasedItems) {
      item.total = item.price * item.selectedQuantity
      this.subtotal = this.subtotal + item.total;
    }
    this.shippingcost = this.subtotal * 0.02
    if (this.shippingcost<2) {this.shippingcost=2}
    this.total = this.subtotal + this.shippingcost
  }

  executepayment(form: any){
    // try to execute payment
    //    if payment is successful = paysuccess = true
    //    if payment is not successful paysuccess = false
    this.paysuccess = true;

    if (this.paysuccess) {
      this.paymentresultmessage = "Payment executed successfully"
      this.flagquery1 = false;
      this.flagquery2 = true;
      // empty the shopping cart
      this.cartserviceService.setCartItems([])
      //reduce the stock in the database
      this.getRemainingItemsList()
      this.kSitemsHttpServiceService.saveItems(this.remainingItems).subscribe()
    } else {
      this.flagquery1 = true;
      this.flagquery2 = false;
      this.paymentresultmessage = "Payment could not be executed. Please check your card details"  
    }
  }

  getRemainingItemsList(){
    if (this.purchasedItems?.length != null) {
      this.remainingItems = []
      for (var count of this.purchasedItems) {
        this.remainingItems.push({
            id: count.id , 
            code: count.icode, 
            category: count.category,
            item:  count.item,
            brand:  count.brand,
            size:  count.size,
            price:  String(count.price),
            unit:  count.unit,
            quantity:  String(count.quantity - count.selectedQuantity)
        })
      }       
    }
  }
}

