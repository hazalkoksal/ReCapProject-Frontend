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

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"cars",component:HomeComponent},
  {path:"cars/brand/:brandId",component:HomeComponent},
  {path:"cars/color/:colorId",component:HomeComponent},
  {path:"cars/brand/:brandId/color/:colorId",component:HomeComponent},
  {path:"cars/cardetail/:carId", component:CarDetailComponent},
  {path:"card/:rental", component:CardComponent},
  {path:"cars/add",component:CarAddComponent},
  {path:"cars/update/:carId",component:CarUpdateComponent},
  {path:"brands",component:BrandComponent},
  {path:"brands/add",component:BrandAddComponent},
  {path:"brands/update/:brandId",component:BrandUpdateComponent},
  {path:"colors",component:ColorComponent},
  {path:"colors/add",component:ColorAddComponent},
  {path:"colors/update/:colorId",component:ColorUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
