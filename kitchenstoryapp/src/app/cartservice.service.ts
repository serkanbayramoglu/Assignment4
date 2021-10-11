import { Injectable } from '@angular/core';
import { CartItems } from './cartItems';

@Injectable({
  providedIn: 'root' 
})
export class CartserviceService {
  private mainCartItems : Array<CartItems> = []

  setCartItems(cartItems: CartItems[]) { 
    this.mainCartItems = cartItems;
  }

  getCartItems() {
    return this.mainCartItems;
  }

  getCartItem(itemCode: string) {
    for (const item of this.mainCartItems) {
      if (item.icode == itemCode) {
        return item;
      }
    }
    return null;
  }

  constructor() { }


}
