import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CardComponent } from './components/card/card.component';
import { CarDetailComponent } from './components/carDetail/car-detail/car-detail.component';
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
  {path:"cars/update/:carId",component:CarUpdateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
