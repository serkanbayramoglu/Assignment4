import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaincompComponent } from './maincomp/maincomp.component';
import { CartcompComponent } from './cartcomp/cartcomp.component';
import { PaycompComponent } from './paycomp/paycomp.component';
import { AdmincompComponent } from './admincomp/admincomp.component';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MaincompComponent,
    CartcompComponent,
    PaycompComponent,
    AdmincompComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
