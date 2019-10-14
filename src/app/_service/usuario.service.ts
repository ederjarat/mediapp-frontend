import { Injectable } from '@angular/core';
import { Usuario } from '../_model/usuario';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  rolCambio = new Subject<Usuario[]>();
  mensajeCambio = new Subject<string>();
  url: string = `${environment.HOST_URL}/usuarios`;

  constructor(private http: HttpClient) { }

  listar(){    
    return this.http.get<Usuario[]>(this.url);
  }

  leer(id:number){
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }

  registrar(usuario: Usuario){
    return this.http.post(this.url, usuario);
  }

}
