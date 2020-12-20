import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponseType} from '../utils/interface';



@Injectable({
  providedIn: 'root'
})
export class HttpDataServiceService {

  constructor(private readonly httpClient: HttpClient) { }

  getData(url:string, httpParams: HttpParams): Observable<ApiResponseType>{
    return this.httpClient.get<ApiResponseType>(url, {params: httpParams});
  } 
}
