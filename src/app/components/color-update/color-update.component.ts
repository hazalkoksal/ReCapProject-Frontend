import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  colorUpdateForm:FormGroup;
  color:Color;

  constructor(private formBuilder:FormBuilder, private colorService:ColorService, private toastrService:ToastrService, private activatedRoute:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      this.getById(params["colorId"]);
   }) 
  }

  createColorUpdateForm(color:Color){
    this.colorUpdateForm = this.formBuilder.group({
      colorId:[color.colorId,Validators.required],
      colorName:[color.colorName,Validators.required]
    })
  }
  
  getById(colorId:number){
    this.colorService.getById(colorId).subscribe(response => {
      this.color = response.data;
      this.createColorUpdateForm(this.color);
    })
  }
  
  update(){
    if(this.colorUpdateForm.valid){
      let color:Color = Object.assign({},this.colorUpdateForm.value)
      this.colorService.update(color).subscribe(
        response => {
          this.toastrService.success("Renk güncellendi");
          this.router.navigate(['/colors']);
        },
        responseError => {
          if(responseError.error.ValidationErrors.length > 0){
            for(let i = 0; i < responseError.error.ValidationErrors.length; i++){
              this.toastrService.error(responseError.error.ValidationErrors[i].ErrorMessage,"Doğrulama hatası")
            }
          }
        });
    }
    else{
      this.toastrService.error("Formu eksiksiz doldurunuz");
    }
  }

}
