import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";
import {DriverLicenseService} from "../../../../shared/services/driver-license.service";
import {ToastrService} from "ngx-toastr";
import {DriverLicense} from "../../../../shared/models/system/driverLicense";
import {EducationService} from "../../../../shared/services/education.service";
import {Education} from "../../../../shared/models/system/education";

@Component({
  selector: 'app-education-create',
  templateUrl: './education-create.component.html',
  styleUrls: ['./education-create.component.scss']
})
export class EducationCreateComponent implements OnInit {

  //@ts-ignore
  fbGroup:UntypedFormGroup;
  //@ts-ignore
  validationErrors:ValidationErrors = {status:false,messages:{}};
  constructor(private service:EducationService ,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.fbGroup = new UntypedFormGroup({
      titleRu:new UntypedFormControl("",Validators.required),
      titleEn:new UntypedFormControl("",Validators.required),
      titleKz:new UntypedFormControl("",Validators.required)
    })
  }


  saveForm(){
    if(this.fbGroup.valid){
      this.service.Create(this.fbGroup.getRawValue() as Education).subscribe(
        response=>{
          this.toastr.success(response.message??"Успешно добавлено");
          this.clearForm();
        },
        error => {
          if(error.errors){
            this.validationErrors.messages = error.errors
            this.validationErrors.status = true
          }
        }
      )
    }
  }

  clearForm(){
    this.fbGroup.reset();
  }

}
