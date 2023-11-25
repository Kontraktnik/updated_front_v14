import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";
import {Area} from "../../../../shared/models/system/area";
import {DriverLicenseService} from "../../../../shared/services/driver-license.service";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute} from "@angular/router";
import {DriverLicense} from "../../../../shared/models/system/driverLicense";
import {MedicalStatusService} from "../../../../shared/services/medical-status.service";
import {MedicalStatus} from "../../../../shared/models/system/medicalStatus";

@Component({
  selector: 'app-medical-status-update',
  templateUrl: './medical-status-update.component.html',
  styleUrls: ['./medical-status-update.component.scss']
})
export class MedicalStatusUpdateComponent implements OnInit {

  //@ts-ignore
  fbGroup:UntypedFormGroup;
  //@ts-ignore
  validationErrors:ValidationErrors = {status:false,messages:{}};
  //@ts-ignore
  data:MedicalStatus;
  //@ts-ignore
  id:number;

  constructor(private service:MedicalStatusService ,private toastr:ToastrService,private route: ActivatedRoute,) {
    this.route.params.subscribe(res => {this.id=res.id});

  }


  ngOnInit(): void {

    this.initializeData();
    this.initializeForm();
  }

  initializeData(){
    this.service.getById(this.id).subscribe(
      response=>{
        this.data = response.data;
        this.setForm();
      },
      error => {

      }
    );
  }

  initializeForm(){
    this.fbGroup = new UntypedFormGroup({
      id:new UntypedFormControl(),
      code:new UntypedFormControl("",Validators.required),
      titleRu:new UntypedFormControl("",Validators.required),
      titleEn:new UntypedFormControl("",Validators.required),
      titleKz:new UntypedFormControl("",Validators.required)
    });
  }

  setForm(){
    if(this.data){
      this.fbGroup.controls["id"].setValue(this.data.id);
      this.fbGroup.controls["code"].setValue(this.data.code);
      this.fbGroup.controls["titleRu"].setValue(this.data.titleRu);
      this.fbGroup.controls["titleEn"].setValue(this.data.titleEn);
      this.fbGroup.controls["titleKz"].setValue(this.data.titleKz);
    }
  }

  saveForm(){
    if(this.fbGroup.valid){
      var model = this.fbGroup.getRawValue() as MedicalStatus;
      this.service.Update(this.id,model).subscribe(
        response=>{
          this.toastr.success(response.message??"Успешно добавлено");
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

}
