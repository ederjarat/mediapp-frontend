import { TokenComponent } from './login/recuperar/token/token.component';
import { Not401Component } from './pages/not401/not401.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { BuscarComponent } from './pages/buscar/buscar.component';
import { EspecialComponent } from './pages/consulta/especial/especial.component';
import { ConsultaComponent } from './pages/consulta/consulta.component';
import { ExamenEdicionComponent } from './pages/examen/examen-edicion/examen-edicion.component';
import { ExamenComponent } from './pages/examen/examen.component';
import { EspecialidadEdicionComponent } from './pages/especialidad/especialidad-edicion/especialidad-edicion.component';
import { EspecialidadComponent } from './pages/especialidad/especialidad.component';
import { PacienteEdicionComponent } from './pages/paciente/paciente-edicion/paciente-edicion.component';
import { PacienteComponent } from './pages/paciente/paciente.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicoComponent } from './pages/medico/medico.component';
import { LoginComponent } from './login/login.component';
import { GuardService } from './_service/guard.service';
import { RecuperarComponent } from './login/recuperar/recuperar.component';
import { RolComponent } from './pages/rol/rol.component';

import { MenuComponent } from './pages/menu/menu.component';
import { RolesUsuariosComponent } from './pages/roles-usuarios/roles-usuarios.component';
import { AsignarRolUserComponent } from './pages/roles-usuarios/asignar-rol-user/asignar-rol-user.component';
import { RolesMenusComponent } from './pages/roles-menus/roles-menus.component';
import { AsignarRolMenuComponent } from './pages/roles-menus/asignar-rol-menu/asignar-rol-menu.component';


const routes: Routes = [
  {
    path: 'paciente', component: PacienteComponent, children: [
      { path: 'nuevo', component: PacienteEdicionComponent },
      { path: 'edicion/:id', component: PacienteEdicionComponent }
    ], canActivate: [GuardService]
  },
  {
    path: 'especialidad', component: EspecialidadComponent, children: [
      { path: 'nuevo', component: EspecialidadEdicionComponent },
      { path: 'edicion/:id', component: EspecialidadEdicionComponent }
    ], canActivate: [GuardService]
  },
  {
    path: 'examen', component: ExamenComponent, children: [
      { path: 'nuevo', component: ExamenEdicionComponent },
      { path: 'edicion/:id', component: ExamenEdicionComponent }
    ], canActivate: [GuardService]
  },
  { path: 'medico', component: MedicoComponent, canActivate: [GuardService] },
  { path: 'consulta', component: ConsultaComponent, canActivate: [GuardService] },
  { path: 'consulta-especial', component: EspecialComponent, canActivate: [GuardService] },
  { path: 'buscar', component: BuscarComponent, canActivate: [GuardService] },
  { path: 'reporte', component: ReporteComponent, canActivate: [GuardService] },
  { path: 'not-401', component: Not401Component },
  { path: 'login', component: LoginComponent },
  {
    path: 'recuperar', component: RecuperarComponent, children: [
      { path: ':token', component: TokenComponent }
    ]
  },
  { path: 'rol', component: RolComponent, canActivate: [GuardService] },
  { path: 'menu', component: MenuComponent,canActivate: [GuardService] },
  {
    path: 'usuario-roles', component: RolesUsuariosComponent, children: [
      { path: 'asignar-rol/:id', component: AsignarRolUserComponent }
    ], canActivate: [GuardService]
  }, 
  {
    path: 'menu-roles', component: RolesMenusComponent, children: [
      { path: 'asignar-rol/:id', component: AsignarRolMenuComponent }
    ], canActivate: [GuardService]
  }, 
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
