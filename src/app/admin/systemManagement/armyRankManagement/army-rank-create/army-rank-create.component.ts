import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";
import {ArmyDepartmentService} from "../../../../shared/services/army-department.service";
import {ToastrService} from "ngx-toastr";
import {ArmyDepartment} from "../../../../shared/models/system/armyDepartment";
import {ArmyRankService} from "../../../../shared/services/army-rank.service";
import {ArmyRank} from "../../../../shared/models/system/armyRank";

@Component({
  selector: 'app-army-rank-create',
  templateUrl: './army-rank-create.component.html',
  styleUrls: ['./army-rank-create.component.scss']
})
export class ArmyRankCreateComponent implements OnInit {

  //@ts-ignore
  fbGroup:UntypedFormGroup;
  //@ts-ignore
  validationErrors:ValidationErrors = {status:false,messages:{}};
  constructor(private armyRankService:ArmyRankService ,private toastr:ToastrService) { }

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
      this.armyRankService.Create(this.fbGroup.getRawValue() as ArmyRank).subscribe(
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
