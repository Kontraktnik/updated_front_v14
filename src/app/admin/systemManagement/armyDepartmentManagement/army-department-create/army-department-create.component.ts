import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";
import {AreaService} from "../../../../shared/services/area.service";
import {ToastrService} from "ngx-toastr";
import {Area} from "../../../../shared/models/system/area";
import {ArmyDepartmentService} from "../../../../shared/services/army-department.service";
import {ArmyDepartment} from "../../../../shared/models/system/armyDepartment";

@Component({
  selector: 'app-army-department-create',
  templateUrl: './army-department-create.component.html',
  styleUrls: ['./army-department-create.component.scss']
})
export class ArmyDepartmentCreateComponent implements OnInit {

  //@ts-ignore
  fbGroup:UntypedFormGroup;
  //@ts-ignore
  validationErrors:ValidationErrors = {status:false,messages:{}};
  constructor(private armyDepartmentService:ArmyDepartmentService ,private toastr:ToastrService) { }

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
      this.armyDepartmentService.Create(this.fbGroup.getRawValue() as ArmyDepartment).subscribe(
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
