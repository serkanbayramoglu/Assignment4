import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdmincompComponent } from './admincomp/admincomp.component';
import { CartcompComponent } from './cartcomp/cartcomp.component';
import { MaincompComponent } from './maincomp/maincomp.component';
import { PaycompComponent } from './paycomp/paycomp.component';

const routes: Routes = [
  {path : "admin", component : AdmincompComponent},
  {path : "maincomp", component : MaincompComponent},
  {path : "cartcomp", component : CartcompComponent},
  {path : "paycomp", component : PaycompComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
