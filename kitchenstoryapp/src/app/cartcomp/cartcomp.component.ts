import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItems } from '../cartItems';
import { CartserviceService } from '../cartservice.service';
import { Ksitems } from '../ksitems';


@Component({
  selector: 'app-cartcomp',
  templateUrl: './cartcomp.component.html',
  styleUrls: ['./cartcomp.component.css']
})
export class CartcompComponent implements OnInit {
  subtotal : number = 0;
  total : number = 0;
  shippingcost : number = 0; 
  cartItems : Array<CartItems> = []

  constructor(private cartserviceService : CartserviceService) { }

  ngOnInit(): void {
    this.cartItems = this.cartserviceService.getCartItems();
    this.cartCalculations()
  }

  minofdata(num1: number) {
    let minvalue = (num1);
    if (24 < (num1)) {minvalue = 24}
    return minvalue
  }

  cartCalculations(){
    this.subtotal = 0
    this.shippingcost = 0
    this.total = 0
    for (const item of this.cartItems) {
      item.total = item.price * item.selectedQuantity
      this.subtotal = this.subtotal + item.total;
    }
    this.shippingcost = this.subtotal * 0.02
    if (this.shippingcost<2) {this.shippingcost=2}
    this.total = this.subtotal + this.shippingcost
  }
}
