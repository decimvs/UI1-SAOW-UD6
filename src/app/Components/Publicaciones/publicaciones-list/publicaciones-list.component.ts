import { Component, OnInit } from '@angular/core';
import {PublicacionModel} from '../../../../Models/PublicacionModel';
import {PublicacionService} from '../../../Services/publicacion.service';
import {AutorModel} from '../../../../Models/AutorModel';
import {Router} from '@angular/router';

declare var $: any; // Acceso a JQuery

@Component({
  selector: 'app-publicaciones-list',
  templateUrl: './publicaciones-list.component.html',
  styleUrls: ['./publicaciones-list.component.css']
})
export class PublicacionesListComponent implements OnInit {

  publicaciones: PublicacionModel[];
  autores: AutorModel[];
  publicacionSeleccionada: PublicacionModel = new PublicacionModel();

  constructor(private publicacionService: PublicacionService, private router: Router) { }

  ngOnInit() {
    this.publicacionService.getAllPublicaciones().subscribe(data => {
      this.publicaciones = data.Items;
    });

    this.publicacionService.getAllAutores().subscribe(data => {
      this.autores = data.Items;
    });
  }

  buscarAutor(id: string): string {
    const autor = this.autores.find(a => a.id === id);

    if (autor != null) {
      return autor.apellido + ', ' + autor.nombre.substring(0, 1) + '.';
    } else {
      return '';
    }
  }

  abrirModal(id: string) {
    this.publicacionSeleccionada = this.publicaciones.find(p => p.id === id);

    $('#eliminarModal').modal('show');
  }

  eliminarPublicacion(id: string) {
    this.publicacionService.deletePublicacion(id).subscribe(data => {
      $('#eliminarModal').modal('hide');
      this.ngOnInit();
    });
  }
}
