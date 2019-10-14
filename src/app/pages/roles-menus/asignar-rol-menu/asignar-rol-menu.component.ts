import { Component, OnInit } from '@angular/core';
import { Rol } from 'src/app/_model/rol';
import { Menu } from 'src/app/_model/menu';
import { RolService } from 'src/app/_service/rol.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MenuService } from 'src/app/_service/menu.service';

@Component({
  selector: 'app-asignar-rol-menu',
  templateUrl: './asignar-rol-menu.component.html',
  styleUrls: ['./asignar-rol-menu.component.css']
})
export class AsignarRolMenuComponent implements OnInit {

  roles: Rol[];
  rolesAsignados: Rol[] = [];
  rolesNuevos: Rol[] = [];
  idMenu:number;
  menuSeleccionado= new Menu;
  rolSeleccionado:string = '';

  constructor(private rolService: RolService, private route: ActivatedRoute, private menuService: MenuService, private router: Router) { }

  ngOnInit() {

    this.rolService.listar().subscribe(roles => {
      this.roles= roles;
    });

    this.route.params.subscribe((params: Params) => {
      this.idMenu= params['id'];
      
      this.menuService.leer(this.idMenu).subscribe( data => {
            this.menuSeleccionado = data;
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
      this.menuService.mensajeCambio.next('El rol ya fue asignado. seleccione otro.');
      return;
    }

    let rolesN = this.rolesNuevos.filter(m=>m.idRol == rol[0].idRol);
    console.log('roles nuevos',rolesN[0]);
    if(rolesN.length > 0){
      this.menuService.mensajeCambio.next('El rol ya fue agregado. seleccione otro.');
      return;
    }

    this.rolesNuevos.push(rol[0]);   
  }

  grabarRoles(){    
    this.rolesNuevos.forEach(x=>{
      this.menuSeleccionado.roles.push(x);
    });
    this.menuService.registrar(this.menuSeleccionado).subscribe(
      resp => {
        console.log(resp);
        this.menuService.mensajeCambio.next('Rol registrado.');
        this.router.navigate(['menu-roles']);
      }
    )
  }

  eliminarRol(rol:Rol){
    this.rolesNuevos = this.rolesNuevos.filter(m=>m!=rol);
  }

}
