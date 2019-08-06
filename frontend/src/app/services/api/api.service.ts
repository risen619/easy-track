import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { ISignIn } from "../../../../../common/src/models/ISignIn";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiURL: string = environment.apiURL;
  constructor(private httpClient: HttpClient) { }

  public login(data: ISignIn) {
    return this.httpClient.post(`${this.apiURL}/sign-in`, data);
  }
}
