import { Component, OnInit } from '@angular/core';
import {PublicacionService} from '../../Services/publicacion.service';
import {AutorModel} from '../../../Models/AutorModel';
import {PublicacionModel} from '../../../Models/PublicacionModel';
import {AutorDashboard} from './AutorDashboard';
import {CognitoAuth} from '../../../Auth/CognitoAuth';
import {UserService} from '../../Services/user.service';
import {Router} from '@angular/router';
// declare const Buffer;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  autores: AutorModel[];
  autoresDash: AutorDashboard[] = [];
  datosCargados: Promise<boolean>;

  constructor(private publicacionService: PublicacionService, private userService: UserService,
              private router: Router) { }

  ngOnInit() {
    /*if (this.userService.getUserType() === '-1') {
        this.router.navigate(['/login']);
    } else {
      this.loadPage();
    }*/

    this.loadPage();
  }

  loadPage() {
    this.publicacionService.getAllAutores().subscribe(data => {
      this.autores = data.Items;

      this.autores.forEach(value => {
        const aut = new AutorDashboard();
        aut.autor = value;
        this.autoresDash.push(aut);
      });

      this.autoresDash.forEach(value => {
        this.publicacionService.getPublicacionesAutor(value.autor.id).subscribe(idata => {
          const autorpubs: PublicacionModel[] = idata.Items;

          value.articulos = 0;
          value.comunicaciones = 0;
          value.libros = 0;
          value.capitulos = 0;
          value.reportes = 0;

          if (autorpubs !== null) {
            autorpubs.forEach(pub => {
              if (pub.tipo === 'articulo') {
                value.articulos++;
              } else if (pub.tipo === 'comunicacion') {
                value.comunicaciones++;
              } else if (pub.tipo === 'libro') {
                value.libros++;
              } else if (pub.tipo === 'capitulo') {
                value.capitulos++;
              } else if (pub.tipo === 'reporte') {
                value.reportes++;
              }
            });
          }
        });
      });

      this.datosCargados = Promise.resolve(true);
    });
  }
}
