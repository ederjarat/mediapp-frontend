import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Rol} from "../../../_model/rol";
import {RolService} from "../../../_service/rol.service";

@Component({
  selector: 'app-rol-edicion',
  templateUrl: './rol-edicion.component.html',
  styleUrls: ['./rol-edicion.component.css']
})
export class RolEdicionComponent implements OnInit {

  rol: Rol;

  constructor(private dialogRef: MatDialogRef<RolEdicionComponent>, @Inject(MAT_DIALOG_DATA) private data: Rol, private rolService: RolService) { }

  ngOnInit() {
    this.rol = new Rol();
    this.rol.idRol = this.data.idRol;
    this.rol.nombre = this.data.nombre;
    this.rol.descripcion = this.data.descripcion;
  }

  cancelar() {
    this.dialogRef.close();
  }

  operar() {
    if (this.rol != null && this.rol.idRol > 0) {
      this.rolService.modificar(this.rol).subscribe(data => {
        this.rolService.listar().subscribe(roles => {
          this.rolService.rolCambio.next(roles);
          this.rolService.mensajeCambio.next("Se modifico");
        });
      });
    } else {
      this.rolService.registrar(this.rol).subscribe(data => {
        this.rolService.listar().subscribe(roles => {
          this.rolService.rolCambio.next(roles);
          this.rolService.mensajeCambio.next("Se registro");
        });
      });
    }
    this.dialogRef.close();
  }


}
