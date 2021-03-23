import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarDetailComponent } from './components/carDetail/car-detail/car-detail.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"cars",component:HomeComponent},
  {path:"cars/brand/:brandId",component:HomeComponent},
  {path:"cars/color/:colorId",component:HomeComponent},
  {path:"cars/brand/:brandId/color/:colorId",component:HomeComponent},
  {path:"cardetail/:carId", component:CarDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
