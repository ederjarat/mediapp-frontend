import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Menu } from 'src/app/_model/menu';
import { MenuService } from 'src/app/_service/menu.service';

@Component({
  selector: 'app-menu-edicion',
  templateUrl: './menu-edicion.component.html',
  styleUrls: ['./menu-edicion.component.css']
})
export class MenuEdicionComponent implements OnInit {

  menu: Menu;

  constructor(private dialogRef: MatDialogRef<MenuEdicionComponent>, @Inject(MAT_DIALOG_DATA) private data: Menu, private menuService: MenuService) { }

  ngOnInit() {
    this.menu = new Menu();
    this.menu.idMenu = this.data.idMenu;
    this.menu.nombre = this.data.nombre;
    this.menu.url = this.data.url;
    this.menu.icono = this.data.icono;
  }

  cancelar() {
    this.dialogRef.close();
  }

  operar() {
    if (this.menu != null && this.menu.idMenu > 0) {
      this.menuService.modificar(this.menu).subscribe(data => {
        this.menuService.listar().subscribe(menues => {
          this.menuService.menuCambio.next(menues);
          this.menuService.mensajeCambio.next("Se modifico");
        });
      });
    } else {
      this.menuService.registrar(this.menu).subscribe(data => {
        this.menuService.listar().subscribe(menues => {
          this.menuService.menuCambio.next(menues);
          this.menuService.mensajeCambio.next("Se registro");
        });
      });
    }
    this.dialogRef.close();
  }

}
