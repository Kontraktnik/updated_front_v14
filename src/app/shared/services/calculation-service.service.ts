import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {IResponse} from "../models/common/response";
import {Calculation} from "../models/calculation/calculation";
import {catchError, map} from "rxjs/operators";
import {AppConfigService} from "../../shared/services/app.config.service";
import { SalaryArea } from '../models/calculation/salaryArea';

@Injectable({
  providedIn: 'root'
})
export class CalculationServiceService {
  baseApiUrl:string = '';

  constructor(private http: HttpClient, private appConfigService: AppConfigService) {
		this.baseApiUrl = this.appConfigService.baseApiUrl;
  }

  calculateSalary(model:Calculation):Observable<IResponse<number>>{
    return this.http.post<IResponse<number>>(this.baseApiUrl + "/Calculation/CalculateSalary",model).pipe(
      map((response:IResponse<number>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
    )
  }

  getSalaryAreas():Observable<IResponse<SalaryArea[]>>{
    return this.http.get<IResponse<SalaryArea[]>>(this.baseApiUrl + "/Calculation/GetAreaSalaries").pipe(
      map((response:IResponse<SalaryArea[]>)=>{
          return response;
        },catchError(error => {
          return error
        })
      ),
    )
  }

}
