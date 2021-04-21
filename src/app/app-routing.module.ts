import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { BrandComponent } from './components/brand/brand.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CardComponent } from './components/card/card.component';
import { CarDetailComponent } from './components/carDetail/car-detail/car-detail.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { ColorComponent } from './components/color/color.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register/register.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"home",component:HomeComponent},
  {path:"cars",component:HomeComponent},
  {path:"cars/brand/:brandId",component:HomeComponent},
  {path:"cars/color/:colorId",component:HomeComponent},
  {path:"cars/brand/:brandId/color/:colorId",component:HomeComponent},
  {path:"cars/cardetail/:carId", component:CarDetailComponent, canActivate:[LoginGuard]},
  {path:"card/:rental", component:CardComponent},
  {path:"cars/add",component:CarAddComponent, canActivate:[LoginGuard]},
  {path:"cars/update/:carId",component:CarUpdateComponent, canActivate:[LoginGuard]},
  {path:"brands",component:BrandComponent},
  {path:"brands/add",component:BrandAddComponent, canActivate:[LoginGuard]},
  {path:"brands/update/:brandId",component:BrandUpdateComponent, canActivate:[LoginGuard]},
  {path:"colors",component:ColorComponent},
  {path:"colors/add",component:ColorAddComponent, canActivate:[LoginGuard]},
  {path:"colors/update/:colorId",component:ColorUpdateComponent, canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
