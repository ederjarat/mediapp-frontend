import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Medico} from "../../_model/medico";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MedicoService} from "../../_service/medico.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MedicoDialogoComponent} from "../medico/medico-dialogo/medico-dialogo.component";
import {MenuService} from "../../_service/menu.service";
import {Menu} from "../../_model/menu";

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

  constructor(private medicoService: MedicoService, private dialog: MatDialog, private snackBar: MatSnackBar,private menuService: MenuService) { }

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

  openDialog(medico?: Medico) {
    let med = medico != null ? medico : new Medico();
    this.dialog.open(MedicoDialogoComponent, {
      width: '250px',
      data: med
    })
  }

  eliminar(medico: Medico) {
    this.medicoService.eliminar(medico.idMedico).subscribe(() => {
      this.medicoService.listar().subscribe(medicos => {
        this.medicoService.medicosCambio.next(medicos);
        this.medicoService.mensajeCambio.next("Se elimino");
      });
    });
  }


}
