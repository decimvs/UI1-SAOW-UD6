import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router,Params} from '@angular/router';
import {AutorModel} from '../../../../Models/AutorModel';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AutorService } from '../../../Services/autor.service';
import {HttpClient} from '@angular/common/http';
@Component({
  selector: 'app-agregar-autor',
  templateUrl: './agregar-autor.component.html',
  styleUrls: ['./agregar-autor.component.css']
})
export class AgregarAutorComponent implements OnInit {


  nombreT='';
  apellidosT='';
  autor: AutorModel;

  constructor(private formBuilder: FormBuilder,
    private autorService: AutorService,
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

    this.autor = new AutorModel();
    if (this.nombreT!='' && this.apellidosT!='')
    {
     
      this.autor= new AutorModel();
      this.autor.nombre =this.nombreT;
      this.autor.apellido =this.apellidosT;
      this.autor.id=this.nombreT+"-"+this.apellidosT;
      this.autorService.addAutor(this.autor).subscribe(data => {
        alert("Guardado correctamente");
        this.router.navigate(['autores']);
      });
      
    }
    //

    

    



  }

}
