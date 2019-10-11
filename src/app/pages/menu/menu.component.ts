import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";

import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";

import {MenuService} from "../../_service/menu.service";
import {Menu} from "../../_model/menu";
import { MenuEdicionComponent } from './menu-edicion/menu-edicion.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  displayedColumns = ['idmenu', 'nombre', 'url', 'icono', 'acciones'];
  dataSource: MatTableDataSource<Menu>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private menuService: MenuService, private dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.menuService.menuCambio.subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.menuService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });


    this.menuService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(menu?: Menu) {
    let med = menu != null ? menu : new Menu();
    this.dialog.open(MenuEdicionComponent, {
      width: '250px',
      data: med
    })
  }

  eliminar(menu: Menu) {
    this.menuService.eliminar(menu.idMenu).subscribe(() => {
      this.menuService.listar().subscribe(menus => {
        this.menuService.menuCambio.next(menus);
        this.menuService.mensajeCambio.next("Se elimino");
      });
    });
  }


}
