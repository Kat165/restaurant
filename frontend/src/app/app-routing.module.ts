import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddDishComponent } from './components/pages/add-dish/add-dish.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { HomeComponent } from './components/pages/home/home.component';
import { LoginPageComponent } from './components/pages/login-page/login-page.component';
import { RegisterPageComponent } from './components/pages/register-page/register-page.component';
import { StartPageComponent } from './components/pages/start-page/start-page.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {path: '',component:StartPageComponent},
  {path: 'menu',component:HomeComponent},
  {path: 'search/:searchTerm',component:HomeComponent},
  {path: 'tag/:tag', component:HomeComponent},
  {path: 'food/:id',component:FoodPageComponent},
  {path: 'cart-page', component:CartPageComponent,canActivate:[AuthGuard]},
  {path: 'add-dish',component:AddDishComponent,canActivate:[AdminGuard]},
  {path: 'login',component:LoginPageComponent},
  {path: 'price/:minvalue',component:HomeComponent},
  {path: 'register', component:RegisterPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
