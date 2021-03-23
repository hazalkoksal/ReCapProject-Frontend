import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { Color } from 'src/app/models/color';
import { BrandService } from 'src/app/services/brand.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.css']
})
export class CarFilterComponent implements OnInit {

  brands:Brand[] = [];
  currentBrandId:number | null;
  filterBrandText="";

  colors:Color[] = [];
  currentColorId:number | null;
  filterColorText="";

  constructor(private brandService:BrandService,private colorService:ColorService) { }

  ngOnInit(): void {
    this.getBrands();
    this.getColors();
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands=response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }

  getRouterLink(){
    if(this.currentBrandId && this.currentColorId){
      return "/cars/brand/" + this.currentBrandId + "/color/" + this.currentColorId;
    }
    else if(this.currentBrandId){
      return "/cars/brand/" + this.currentBrandId;
    }
    else if(this.currentColorId){
      return "/cars/color/" + this.currentColorId;
    }
    else{
      return "/cars";
    }
  }

}
