import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";
import {ArmyRegionService} from "../../../../shared/services/army-region.service";
import {ToastrService} from "ngx-toastr";
import {ArmyRegion} from "../../../../shared/models/system/armyRegion";
import {DriverLicenseService} from "../../../../shared/services/driver-license.service";
import {DriverLicense} from "../../../../shared/models/system/driverLicense";

@Component({
  selector: 'app-driver-license-create',
  templateUrl: './driver-license-create.component.html',
  styleUrls: ['./driver-license-create.component.scss']
})
export class DriverLicenseCreateComponent implements OnInit {
  //@ts-ignore
  fbGroup:UntypedFormGroup;
  //@ts-ignore
  validationErrors:ValidationErrors = {status:false,messages:{}};
  constructor(private driverLicenseService:DriverLicenseService ,private toastr:ToastrService) { }

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
      this.driverLicenseService.Create(this.fbGroup.getRawValue() as DriverLicense).subscribe(
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
