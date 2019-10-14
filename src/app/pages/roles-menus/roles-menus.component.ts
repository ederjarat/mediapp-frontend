import { Component, OnInit, ViewChild } from '@angular/core';
import { Menu } from 'src/app/_model/menu';
import { MatTableDataSource, MatPaginator, MatSort, MatSnackBar } from '@angular/material';
import { MenuService } from 'src/app/_service/menu.service';

@Component({
  selector: 'app-roles-menus',
  templateUrl: './roles-menus.component.html',
  styleUrls: ['./roles-menus.component.css']
})
export class RolesMenusComponent implements OnInit {

  displayedColumns = ['idmenu', 'nombre','icono','url', 'acciones'];
  dataSource: MatTableDataSource<Menu>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  constructor(private menuService: MenuService,private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.menuService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    this.menuService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'Aviso', { duration: 2000 });
    });

  }

}
