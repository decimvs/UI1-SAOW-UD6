import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './Components/dashboard/dashboard.component';
import {AutorListComponent} from './Components/Autor/autor-list/autor-list.component';

import {BorrarAutorComponent} from './Components/Autor/borrar-autor/borrar-autor.component'

import {PublicacionesListComponent} from './Components/Publicaciones/publicaciones-list/publicaciones-list.component';
import {UsuariosListComponent} from './Components/Usuarios/usuarios-list/usuarios-list.component';
import {AgregarAutorComponent} from './Components/Autor/agregar-autor/agregar-autor.component';
import {EditarAutorComponent} from './Components/Autor/editar-autor/editar-autor.component';
import { UsuariosAgregarComponent } from './Components/Usuarios/usuarios-agregar/usuarios-agregar.component';
import { UsuariosEditarComponent } from './Components/Usuarios/usuarios-editar/usuarios-editar.component';
import { PublicacionesAgregarComponent } from './Components/Publicaciones/publicaciones-agregar/publicaciones-agregar.component';
import { UsuariosBorrarComponent } from './Components/Usuarios/usuarios-borrar/usuarios-borrar.component';
import { UsuariosLoginComponent } from './Components/Usuarios/usuarios-login/usuarios-login.component';
import { AuthGuardService as AuthGuard } from '../Auth/auth-guard.service';
import {UsuariosLogoutComponent} from './Components/Usuarios/usuarios-logout/usuarios-logout.component';


const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'autores', component: AutorListComponent, canActivate: [AuthGuard]},
  {path: 'autores/agregar', component: AgregarAutorComponent, canActivate: [AuthGuard]},
  {path: 'autores/borrar/:id', component: BorrarAutorComponent, canActivate: [AuthGuard]},
  {path: 'autores/editar/:id', component: EditarAutorComponent, canActivate: [AuthGuard]},
  {path: 'publicaciones', component: PublicacionesListComponent, canActivate: [AuthGuard]},
  {path: 'usuarios/usuarios-agregar', component: UsuariosAgregarComponent, canActivate: [AuthGuard]},
  {path: 'usuarios/usuarios-editar', component: UsuariosEditarComponent, canActivate: [AuthGuard]},
  {path: 'usuarios/usuarios-borrar', component: UsuariosBorrarComponent, canActivate: [AuthGuard]},
  {path: 'usuarios/usuarios-login', component: UsuariosLoginComponent, canActivate: [AuthGuard]},
  {path: 'publicaciones/publicaciones-agregar', component: PublicacionesAgregarComponent, canActivate: [AuthGuard]},
  {path: 'publicaciones/publicaciones-agregar/:id', component: PublicacionesAgregarComponent, canActivate: [AuthGuard]},
  {path: 'publicaciones/publicaciones-list', component: PublicacionesListComponent, canActivate: [AuthGuard]},
  {path: 'usuarios', component: UsuariosListComponent, canActivate: [AuthGuard]},
  {path: 'login', component: UsuariosLoginComponent},
  {path: 'logout', component: UsuariosLogoutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
