import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";
import {QualificationService} from "../../../../shared/services/qualification.service";
import {ToastrService} from "ngx-toastr";
import {Qualification} from "../../../../shared/models/calculation/qualification";
import {SecretLevelService} from "../../../../shared/services/secret-level.service";
import {SecretLevel} from "../../../../shared/models/calculation/secretLevel";

@Component({
  selector: 'app-secret-level-create',
  templateUrl: './secret-level-create.component.html',
  styleUrls: ['./secret-level-create.component.scss']
})
export class SecretLevelCreateComponent implements OnInit {
  //@ts-ignore
  fbGroup:UntypedFormGroup;
  //@ts-ignore
  validationErrors:ValidationErrors = {status:false,messages:{}};
  constructor(private service:SecretLevelService ,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(){
    this.fbGroup = new UntypedFormGroup({
      titleRu:new UntypedFormControl("",Validators.required),
      titleEn:new UntypedFormControl("",Validators.required),
      titleKz:new UntypedFormControl("",Validators.required),
      percentage:new UntypedFormControl("",Validators.required)
    })
  }


  saveForm(){
    if(this.fbGroup.valid){
      this.service.Create(this.fbGroup.getRawValue() as SecretLevel).subscribe(
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
