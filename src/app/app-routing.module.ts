import { LoginComponent } from './login/login.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { ProduitsComponent } from "./produits/Produits.component";
import { AddProduitComponent } from './add-produit/add-produit.component';
import { UpdateProduitComponent } from './update-produit/update-produit.component';
import { ProduitGuard } from './produit.guard';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { DetailProduitComponent  } from './detail-produit/detail-produit.component';
import { RestaurantComponent  } from './restaurant/restaurant.component';



const routes: Routes = [
  {path : "restaurants", component : RestaurantComponent},
  {path : "inscription", component : InscriptionComponent},
  {path : "produits", component : ProduitsComponent},
  {path: "detail-produit/:id", component: DetailProduitComponent},
  {path : "add-produit", component : AddProduitComponent, canActivate:[ProduitGuard]},
  {path: "updateProduit/:id", component: UpdateProduitComponent, canActivate:[ProduitGuard]},
  {path:  'login', component: LoginComponent},
  {path:  'app-forbidden', component: ForbiddenComponent},
  {path: "", redirectTo: "produits", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
