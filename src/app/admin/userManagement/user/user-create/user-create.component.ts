import { Component, OnInit } from '@angular/core';
import {UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {ValidationErrors} from "../../../../shared/models/common/validation_errors";
import {Area} from "../../../../shared/models/system/area";
import {Role} from "../../../../shared/models/user/role";
import {UserService} from "../../../../shared/services/user.service";
import {AreaService} from "../../../../shared/services/area.service";
import {RoleService} from "../../../../shared/services/role.service";
import {IUser} from "../../../../shared/models/user/user";
import {ToastrService} from "ngx-toastr";
import {Roles} from "../../../../shared/constants/roles";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss']
})
export class UserCreateComponent implements OnInit {
  //@ts-ignore
  fbGroup:UntypedFormGroup;
  validationErrors:ValidationErrors = {status:false,messages:{}};
  areas:Area[] = [];
  roles:Role[] = [];
  keyword:string = "titleRu";
  showArea:boolean = false;

  constructor(
    private service:UserService,
    private areaService:AreaService,
    private roleService:RoleService,
    private toastr:ToastrService
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.initializeRole();
    this.initializeArea();
  }



  initializeForm(){
    this.fbGroup = new UntypedFormGroup({
      roleId:new UntypedFormControl("",Validators.required),
      areaId:new UntypedFormControl(""),
      iin: new UntypedFormControl('', [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(12),]),
      password: new UntypedFormControl('', [Validators.required,Validators.minLength(6)]),
      name: new UntypedFormControl('', [Validators.required, Validators.pattern("^[а-яА-ЯёЁәӘіІңҢғҒүҮұҰқҚөӨһҺ]*$")]),
      surname: new UntypedFormControl('', [Validators.required, Validators.pattern("^[а-яА-ЯёЁәӘіІңҢғҒүҮұҰқҚөӨһҺ]*$")]),
      patronymic: new UntypedFormControl('', [Validators.pattern("^[а-яА-ЯёЁәӘіІңҢғҒүҮұҰқҚөӨһҺ]*$")]),
      phone: new UntypedFormControl('', [Validators.required,]),
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      verified:new UntypedFormControl(true),
      status:new UntypedFormControl(true)
    })
  }


  saveForm(){
    if(this.fbGroup.valid){
      this.service.Create(this.fbGroup.getRawValue() as IUser).subscribe(
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

  initializeRole(){
    this.roleService.getAll(true).subscribe(
      response=>{
        this.roles = response.data;
      }
    )
  }


  initializeArea(){
    this.areaService.getAll(true).subscribe(
      response=>{
        this.areas = response.data;
      }
    )
  }

  selectRoleEvent(item: Role) {
    if(item){
      this.showArea = true;
      this.fbGroup.controls["roleId"].setValue(item.id);
      if(item.id == Roles.EXECUTOR || item.id == Roles.KNB || item.id == Roles.MED ){
        this.fbGroup.controls["areaId"].setValidators(Validators.required);
      }
      else{
        this.showArea = false;
        this.fbGroup.controls["areaId"].setValue(null);
        this.fbGroup.controls["areaId"].removeValidators(Validators.required);
      }
    }
  }
  isClosedRoleAutoComplete() {
    this.fbGroup.controls["roleId"].setValue(null);
    this.fbGroup.controls["areaId"].setValue(null);
    this.showArea = true;
  }

  selectAreaEvent(item: Area) {
    if(item){
      this.fbGroup.controls["areaId"].setValue(item.id);
    }
  }

  isClosedAreaAutoComplete() {
    this.fbGroup.controls["areaId"].setValue(null);
  }



}
