import { Component, OnInit } from '@angular/core';
import {AutorModel} from '../../../../Models/AutorModel';
import {AutorService} from '../../../Services/autor.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router,Params} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
@Component({
  selector: 'app-editar-autor',
  templateUrl: './editar-autor.component.html',
  styleUrls: ['./editar-autor.component.css']
})
export class EditarAutorComponent implements OnInit {


  nombreT='';
  apellidosT='';

 

 
  id = '';
  autor: AutorModel;

  constructor(private formBuilder: FormBuilder,
    private autoresService: AutorService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

      this.activatedRoute.queryParams.subscribe((params: Params) => {
        
        
        if (params["nombre"]!=null)
        {
          this.nombreT= params["nombre"];

        }
        if (params["apellidos"]!=null)
        {
          this.apellidosT= params["apellidos"];
        }

     
      });

  }

  ngOnInit() {

    if (this.nombreT!='' && this.apellidosT!='')
    {
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
    
      this.autor= new AutorModel();
      this.autor.nombre =this.nombreT;
      this.autor.apellido =this.apellidosT;
      this.autor.id=this.nombreT+"-"+this.apellidosT;
      
      this.autoresService.editAutor(this.autor,this.id).subscribe(data => {
        alert("Modificado correctamente");
        this.router.navigate(['autores']);
      });
      
    }
    else{
      this.id = this.activatedRoute.snapshot.paramMap.get('id');
      
      this.autoresService.getAutor(this.id).subscribe(data => {
        
        this.nombreT= data.nombre;
        this.apellidosT= data.apellido;
      });
    }
  }

}
