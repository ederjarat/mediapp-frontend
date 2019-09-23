import { Injectable } from '@angular/core';
import {Subject} from "rxjs";
import {Menu} from "../_model/menu";
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Rol} from "../_model/rol";

@Injectable({
  providedIn: 'root'
})
export class RolService {

  rolCambio = new Subject<Rol[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST_URL}`;

  constructor(private http: HttpClient) { }

  listar(){
    let access_token = JSON.parse(sessionStorage.getItem(environment.TOKEN_NAME)).access_token;
    return this.http.get<Rol[]>(`${this.url}/roles`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`).set('Content-Type', 'application/json')
    });
  }
}
