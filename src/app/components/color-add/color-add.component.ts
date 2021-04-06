import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-add',
  templateUrl: './color-add.component.html',
  styleUrls: ['./color-add.component.css']
})
export class ColorAddComponent implements OnInit {

  colorAddForm:FormGroup;

  constructor(private formBuilder:FormBuilder, private colorService:ColorService, private toastrService:ToastrService, private router:Router) { }

  ngOnInit(): void {
    this.createColorAddForm();
  }

  createColorAddForm(){
    this.colorAddForm = this.formBuilder.group({
      colorName:["",Validators.required],
    })
  }

  add(){
    if(this.colorAddForm.valid){
      let color:Color = Object.assign({},this.colorAddForm.value)
      this.colorService.add(color).subscribe(
        response => {
          this.toastrService.success("Renk eklendi");
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
