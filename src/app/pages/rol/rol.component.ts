import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Menu} from "../../_model/menu";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MedicoService} from "../../_service/medico.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MenuService} from "../../_service/menu.service";
import {Medico} from "../../_model/medico";
import {MedicoDialogoComponent} from "../medico/medico-dialogo/medico-dialogo.component";
import {RolService} from "../../_service/rol.service";
import {Rol} from "../../_model/rol";
import {RolEdicionComponent} from "./rol-edicion/rol-edicion.component";

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {

  displayedColumns = ['idrol', 'nombre','descripcion', 'acciones'];
  dataSource: MatTableDataSource<Rol>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private rolService: RolService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.rolService.rolCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.rolService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });


    this.rolService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(rol?: Rol) {
    let role = rol != null ? rol : new Rol();
    console.log(role)
    this.dialog.open(RolEdicionComponent, {
      width: '250px',
      data: role
    })
  }

  eliminar(rol: Rol) {
    
    this.rolService.eliminar(rol.idRol).subscribe(() => {
      this.rolService.listar().subscribe(roles => {
        this.rolService.rolCambio.next(roles);
        this.rolService.mensajeCambio.next("Se elimino");
      });
    });

     
  }



}
