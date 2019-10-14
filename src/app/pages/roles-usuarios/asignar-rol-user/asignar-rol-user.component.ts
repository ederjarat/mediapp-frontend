import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/_model/rol';
import { RolService } from 'src/app/_service/rol.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UsuarioService } from 'src/app/_service/usuario.service';
import { Usuario } from 'src/app/_model/usuario';


@Component({
  selector: 'app-asignar-rol-user',
  templateUrl: './asignar-rol-user.component.html',
  styleUrls: ['./asignar-rol-user.component.css']
})
export class AsignarRolUserComponent implements OnInit {

  roles: Rol[];
  rolesAsignados: Rol[] = [];
  rolesNuevos: Rol[] = [];
  idUsuario:number;
  usuarioSeleccionado= new Usuario;
  rolSeleccionado:string = '';

  constructor(private rolService: RolService, private route: ActivatedRoute, private usuarioService: UsuarioService,private router: Router) { }

  ngOnInit() {

    this.rolService.listar().subscribe(roles => {
      this.roles= roles;
    });

    this.route.params.subscribe((params: Params) => {
      this.idUsuario = params['id'];
      
      this.usuarioService.leer(this.idUsuario).subscribe( data => {
            this.usuarioSeleccionado = data;
            this.rolesAsignados = data.roles;
      });
    });


  }

  agregarRol(){
    let rol: Rol[];
    rol = this.roles.filter(x => x.idRol == parseInt(this.rolSeleccionado));
    console.log('roles seleccionado => ',rol);
    let rolesA = this.rolesAsignados.filter(m=>m.idRol == rol[0].idRol);
    console.log('roles asignados',rolesA[0]);
    if(rolesA.length > 0){
      this.usuarioService.mensajeCambio.next('El rol ya fue asignado. seleccione otro.');
      return;
    }

    let rolesN = this.rolesNuevos.filter(m=>m.idRol == rol[0].idRol);
    console.log('roles nuevos',rolesN[0]);
    if(rolesN.length > 0){
      this.usuarioService.mensajeCambio.next('El rol ya fue agregado. seleccione otro.');
      return;
    }

    this.rolesNuevos.push(rol[0]);   
  }

  grabarRoles(){    
    this.rolesNuevos.forEach(x=>{
      this.usuarioSeleccionado.roles.push(x);
    });
    this.usuarioService.registrar(this.usuarioSeleccionado).subscribe(
      resp => {
        console.log(resp);
        this.usuarioService.mensajeCambio.next('Rol registrado.');
        this.router.navigate(['usuario-roles']);
      }
    )
  }

  eliminarRol(rol:Rol){
    this.rolesNuevos = this.rolesNuevos.filter(m=>m!=rol);
  }

}
