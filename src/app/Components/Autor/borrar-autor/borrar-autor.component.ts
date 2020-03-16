import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router,Params} from '@angular/router';
import {AutorModel} from '../../../../Models/AutorModel';
import {AutorService} from '../../../Services/autor.service';
@Component({
  selector: 'app-borrar-autor',
  templateUrl: './borrar-autor.component.html',
  styleUrls: ['./borrar-autor.component.css']
})
export class BorrarAutorComponent implements OnInit {

  id:string;
  constructor(
    private autoresService: AutorService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    var opcion = confirm("¿Desea eliminar "+ this.id+ "?");
    if (opcion == true) {
      this.autoresService.deleteAutor(this.id).subscribe(data => {
        alert("Borrado correctamente");
        this.router.navigate(['autores']);
      });
    } else {
      this.router.navigate(['autores']);
        //mensaje = "Has clickado Cancelar";
    }

  }


}
