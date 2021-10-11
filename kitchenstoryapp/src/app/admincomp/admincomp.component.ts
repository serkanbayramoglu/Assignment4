import { Component, OnInit } from '@angular/core';
import { CategoryitemsserviceService } from '../categoryitemsservice.service';
import { Ksitems } from '../ksitems';
import { KSitemsHttpServiceService } from '../ksitems-http-service.service';
import { ResponseItems } from '../responseitems';
import { UserPasswordsHttpServiceService } from '../user-passwords-http-service.service';
import { UserPasswords } from '../userpasswords';

@Component({
  selector: 'app-admincomp',
  templateUrl: './admincomp.component.html',
  styleUrls: ['./admincomp.component.css']
})
export class AdmincompComponent implements OnInit {
  flagpword: boolean = true;
  flagoptions: boolean = false;
  flagchangepword: boolean = false;
  flagmasterlist: boolean = false; 
  flagquerycode: boolean = false;
  flagaction: boolean = false;

  flagloginerror: boolean = false;
  errormessagelogin: string = "";
  flagchangepasswordresult: boolean = false;
  messagechangepassword: string = " ";
  flagquerydisabled: boolean = false;
  flagdelete: boolean = false;
  flagadd: boolean = false;

  flagactionresult: boolean = false;
  actionresultmesage:string = "";

  result : ResponseItems | undefined;
  public itemsFromService : Array<Ksitems> | undefined;
  public itemFromService : any = "";
  public categoryItemsFromService : any[] = []

  errormesage = "";
  errormesageaction = "";
  actionselected: string = "";
  toedit = "";
    
  public allitemsincategories: any[] =[]
  allitemsincategory = ["Select"];

  coderetrieved: string = "";

  constructor(private userPasswordsHttpServiceService : UserPasswordsHttpServiceService,
    private kSitemsHttpServiceService : KSitemsHttpServiceService,
    private categoryitemsserviceService : CategoryitemsserviceService
  ) { }

  ngOnInit(): void {
    this.retrieveKSItemsData();
  }

  retrieveKSItemsData(){
    this.kSitemsHttpServiceService.getCategoryItems().subscribe(data => this.categoryItemsFromService = data)
    this.kSitemsHttpServiceService.getItems().subscribe(data => this.itemsFromService = data);
    this.categoryitemsserviceService.getAllCategoryItems().subscribe(data => this.allitemsincategories = data)
  }
 
  loginAdmin(frm: any) {
    let uname = frm.form.value.uname;
    let pword = frm.form.value.pword;
 
    this.userPasswordsHttpServiceService.verifyUser([uname,pword]).subscribe(data => this.result = data);
    
    setTimeout(() => {
      if (this.result != null) {
        if (this.result.response == "admin") {
          this.flagpword = false;
          this.flagoptions = true;
          this.flagloginerror = false;
        } else {
          this.flagloginerror = true;
          this.errormessagelogin = "Username or password is incorrect";
        }
      } else {
        this.flagloginerror = true;
        this.errormessagelogin = "Technical problem occured please try again";
      } 
    }, 500)
  }

  changePasswordAdmin(frm: any) {
    let uname = frm.form.value.uname2;
    let pword = frm.form.value.pword2;
    let newpword = frm.form.value.newpword;
 
    this.userPasswordsHttpServiceService.changePassword([uname,pword,newpword]).subscribe(data => this.result = data);

    setTimeout(() => {
      if (this.result != null) {
        if (this.result.response == "admin") {
          this.flagchangepasswordresult = true;
          this.messagechangepassword = "Password changed successfully"
          this.flagchangepword = false;
        } else {
          if (this.result.response == "invalid") {
            this.flagchangepasswordresult = true;
            this.messagechangepassword = "Username or password is incorrect";
          } else {
            this.flagchangepasswordresult = true;
            this.messagechangepassword = "Technical problem occured please try again";
          }
        }
      } else {
        this.flagchangepasswordresult = true;
        this.messagechangepassword = "Technical problem occured please try again";
      } 
    }, 500)
  }

  activatepasswordchange() {
    this.flagoptions = false;
    this.flagchangepword = true;
  }

  retrievemasterlist() {
    this.flagoptions = false;
    this.flagmasterlist = true;
  }

  retrieveItem(frm: any) {
    this.errormesageaction = "";
    this.actionresultmesage = "";
    this.coderetrieved = frm.form.value.codetoretrieve
    this.kSitemsHttpServiceService.getbyCode(this.coderetrieved).subscribe(data => this.itemFromService = data);
    setTimeout(() => {
      if (this.itemFromService != null) {
        switch (frm.form.value.actionselect) {
          case "addrecord":
            this.errormesage = "An entry with this code number already exists. Please enter another code number."
            break;
          case "updaterecord":
            this.flagaction = true;
            this.flagquerydisabled = true
            this.errormesage = "";
            this.actionselected = "Update Record"
            this.toedit = " to edit"
            this.flagdelete = false;
            this.flagadd = false;
            break;
          case "deleterecord":
            this.flagaction = true;
            this.flagquerydisabled = true
            this.errormesage = "";
            this.actionselected = "Delete Record"
            this.flagdelete = true;
            this.flagadd = false;
            break;
        }
      } else {
        switch (frm.form.value.actionselect) {
          case "addrecord":
            this.flagaction = true;
            this.flagquerydisabled = true
            this.errormesage = "";
            this.actionselected = "Add Record"
            this.toedit = " to add"
            this.flagdelete = false;
            this.flagadd = true;
            break;
          case "updaterecord":
            this.errormesage = "An entry with this code number does not exists in the database. "
            break;
          case "deleterecord":
            this.errormesage = "An entry with this code number does not exists in the database. "
            break;
        }
      }
    }, 300)
  }

  processAction(frm: any) {
    this.errormesageaction = "";
    this.actionresultmesage = "";
    let scategory: string = frm.form.value.selectedcategory;
    let sitem: string = frm.form.value.selecteditem;
    let ssize: string = frm.form.value.selectedsize;
    let sbrand: string = frm.form.value.actionbrand;
    let squantity: string = frm.form.value.actionquantity;
    let sprice: string = frm.form.value.actionprice;
    let sunit: string = frm.form.value.selectedunit;

    switch (this.actionselected) {
      case "Add Record":
        if ((scategory != "Select") && (scategory != null) && (scategory != "") && (sitem != "Select") && (sitem != null) 
          && (sitem != "") && (ssize != null) && (ssize != "") && (sunit != null) && (sunit != "") && (sbrand != null) 
          && (sbrand != "") && (squantity != null) && (squantity != "") && (sprice != null) && (sprice != "")) {
          let itemtoadd = {"id":"0","code":this.coderetrieved,"category":scategory,"item":sitem,"brand":sbrand,"quantity":squantity,"size":ssize,"price":sprice,"unit":sunit}
          this.kSitemsHttpServiceService.saveItems([itemtoadd]).subscribe()
          this.actionresultmesage = "Item added successfully please check the master list"
          this.flagaction = false
          this.flagactionresult = true
          this.flagquerydisabled = false
        } else {
          this.errormesageaction = "Please check that all entries in the form are filled and try again."
        }
        break;
      case "Update Record":
        let itemtoupdate = this.itemFromService;
        let isupdated:boolean = false;
        let erroritemcategory:boolean = false
        if ((scategory != null) && (scategory != "")){
          if (scategory != "Select") {
            if ((sitem == "Select") || (sitem == null) || (sitem == "")) {
              erroritemcategory = true
              this.errormesageaction = "New item needs to be selected, if new category is selected"
            } else {
              itemtoupdate.category = scategory;
              itemtoupdate.item = sitem;
              isupdated = true;
            }
          }
        }
        if ((sbrand != null) && (sbrand != "")){
          itemtoupdate.brand = sbrand;
          isupdated = true;
        }
        if ((squantity != null) && (squantity != "")){
          itemtoupdate.quantity = squantity;
          isupdated = true;
        }
        if ((ssize != null) && (ssize != "")){
          itemtoupdate.size = ssize;
          isupdated = true;
        }
        if ((sprice != null) && (sprice != "")){
          itemtoupdate.price = sprice;
          isupdated = true;
        }
        if ((sunit != null) && (sunit != "")){
          itemtoupdate.unit = sunit;
          isupdated = true;
        }
        if (isupdated){
          this.kSitemsHttpServiceService.saveItems([itemtoupdate]).subscribe()
          this.actionresultmesage = "Item updated successfully please check the master list"
          this.flagaction = false
          this.flagactionresult = true
          this.flagquerydisabled = false
        } else {
          if (!erroritemcategory) {
            this.errormesageaction = "No updates found on any field"
          }
        }
        break;
      case "Delete Record":
        let itemtodelete = {"id":"0","code":this.coderetrieved,"category":scategory,"item":sitem,"brand":sbrand,"quantity":squantity,"size":ssize,"price":sprice,"unit":sunit}
        this.kSitemsHttpServiceService.deleteItems(itemtodelete).subscribe()
        this.actionresultmesage = "Item deleted successfully please check the master list"
        this.flagaction = false
        this.flagactionresult = true
        this.flagquerydisabled = false
        break;
    }
  }

  setallitemsincategory(selectedCategory: any){
    for (const itemlist of this.allitemsincategories){
      if (selectedCategory.value == itemlist.category){
        this.allitemsincategory = itemlist.items; 
      }
    }
  }

  returntooptions() {
    this.flagoptions = true;
    this.flagmasterlist = false;
    this.flagchangepasswordresult = false;
    this.flagquerycode = false;
    this.flagaction = false;
    this.flagactionresult = false;
    this.errormesageaction = "";
    this.actionresultmesage = "";
    this.retrieveKSItemsData()
  }

  activatecodequery() {
    this.flagoptions = false;
    this.flagquerycode = true
    this.flagquerydisabled = false;
    this.flagactionresult = false;

  }

}
