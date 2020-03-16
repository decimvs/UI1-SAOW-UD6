import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PublicacionService} from '../../../Services/publicacion.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PublicacionModel} from '../../../../Models/PublicacionModel';
import {PublicacionTipo} from '../../../../Models/PublicacionTipo';
import {AutorModel} from '../../../../Models/AutorModel';

@Component({
  selector: 'app-publicaciones-agregar',
  templateUrl: './publicaciones-agregar.component.html',
  styleUrls: ['./publicaciones-agregar.component.css']
})
export class PublicacionesAgregarComponent implements OnInit {

  mTitulo = false;
  mAutores = false;
  mRevista = false;
  mIssn = false;
  mAnyo = false;
  mCongreso = false;
  mLugar = false;
  mEditorial = false;
  mLibro = false;
  mReferencia = false;

  addPublicacion: FormGroup;
  submitted = false;

  action = 'add';
  id = '';
  publicacion: PublicacionModel;
  autores: AutorModel[];

  tiposPublicacion = [
    new PublicacionTipo('articulo', 'Artículo de revista'),
    new PublicacionTipo('comunicacion', 'Comunicación congreso'),
    new PublicacionTipo('libro', 'Libro'),
    new PublicacionTipo('capitulo', 'Capítulo'),
    new PublicacionTipo('reporte', 'Reporte científico')
  ]

  constructor(private formBuilder: FormBuilder,
              private publicacionService: PublicacionService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    this.publicacionService.getAllAutores().subscribe(data => {
      this.autores = data.Items;
    });

    if (this.id === null) {
      this.action = 'add';
      this.publicacion = new PublicacionModel();
      this.createForm();
    } else {
      this.action = 'edit';
      this.publicacionService.getPublicacion(this.id).subscribe(idata => {
        this.publicacion = idata.Item;
        this.createForm();
        this.UpdateForm(this.publicacion.tipo);
      });
    }
  }

  createForm() {
    this.addPublicacion = this.formBuilder.group({
      tipo: [this.publicacion.tipo],
      autores: [this.publicacion.autores, [Validators.required, Validators.minLength(1)]],
      titulo: [this.publicacion.titulo, [Validators.required, Validators.minLength(2)]],
      revista: [this.publicacion.revista],
      issn: [this.publicacion.issn],
      anyo: [this.publicacion.anyo, [Validators.required, Validators.minLength(4)]],
      congreso: [this.publicacion.congreso],
      lugar: [this.publicacion.lugar],
      editorial: [this.publicacion.editorial],
      libro: [this.publicacion.libro],
      referencia: [this.publicacion.referencia]
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.addPublicacion.valid) {
      if (this.action === 'add') {
        this.publicacionService.addPublicacion(this.addPublicacion.value)
          .subscribe(data => {
            this.router.navigate(['publicaciones']);
          });
      } else {
        this.publicacionService.editPublicacion(this.addPublicacion.value, this.id)
          .subscribe(data => {
            this.router.navigate(['publicaciones']);
          });
      }
    }
  }

  get f() {
    return this.addPublicacion.controls;
  }

  UpdateForm(opcion: string) {
    const revista = this.addPublicacion.get('revista');
    const issn = this.addPublicacion.get('issn');
    const congreso = this.addPublicacion.get('congreso');
    const lugar = this.addPublicacion.get('lugar');
    const editorial = this.addPublicacion.get('editorial');
    const libro = this.addPublicacion.get('libro');
    const referencia = this.addPublicacion.get('referencia');

    this.mTitulo = true;
    this.mAutores = true;
    this.mAnyo = true;

    if (opcion === 'articulo') {
      this.mRevista = true;
      this.mIssn = true;

      this.mCongreso = false;
      this.mLugar = false;
      this.mEditorial = false;
      this.mLibro = false;
      this.mReferencia = false;

      revista.setValidators([Validators.required]);
      issn.setValidators([Validators.required]);
      congreso.setValidators(null);
      lugar.setValidators(null);
      editorial.setValidators(null);
      libro.setValidators(null);
      referencia.setValidators(null);

    } else if (opcion === 'comunicacion') {
      this.mCongreso = true;
      this.mLugar = true;

      this.mRevista = false;
      this.mIssn = false;
      this.mEditorial = false;
      this.mLibro = false;
      this.mReferencia = false;

      revista.setValidators(null);
      issn.setValidators(null);
      congreso.setValidators([Validators.required]);
      lugar.setValidators([Validators.required]);
      editorial.setValidators(null);
      libro.setValidators(null);
      referencia.setValidators(null);

    } else if (opcion === 'libro') {
      this.mEditorial = true;

      this.mRevista = false;
      this.mIssn = false;
      this.mCongreso = false;
      this.mLugar = false;
      this.mLibro = false;
      this.mReferencia = false;

      revista.setValidators(null);
      issn.setValidators(null);
      congreso.setValidators(null);
      lugar.setValidators(null);
      editorial.setValidators([Validators.required]);
      libro.setValidators(null);
      referencia.setValidators(null);

    } else if (opcion === 'capitulo') {
      this.mEditorial = true;
      this.mLibro = true;

      this.mRevista = false;
      this.mIssn = false;
      this.mCongreso = false;
      this.mLugar = false;
      this.mReferencia = false;

      revista.setValidators(null);
      issn.setValidators(null);
      congreso.setValidators(null);
      lugar.setValidators(null);
      editorial.setValidators([Validators.required]);
      libro.setValidators([Validators.required]);
      referencia.setValidators(null);

    } else if (opcion === 'reporte') {
      this.mReferencia = true;

      this.mRevista = false;
      this.mIssn = false;
      this.mCongreso = false;
      this.mLugar = false;
      this.mEditorial = false;
      this.mLibro = false;

      revista.setValidators(null);
      issn.setValidators(null);
      congreso.setValidators(null);
      lugar.setValidators(null);
      editorial.setValidators(null);
      libro.setValidators(null);
      referencia.setValidators([Validators.required]);

    } else {
      this.mTitulo = false;
      this.mAutores = false;
      this.mAnyo = false;
      this.mReferencia = false;
      this.mRevista = false;
      this.mIssn = false;
      this.mCongreso = false;
      this.mLugar = false;
      this.mEditorial = false;
      this.mLibro = false;

      revista.setValidators([Validators.required]);
      issn.setValidators([Validators.required]);
      congreso.setValidators([Validators.required]);
      lugar.setValidators([Validators.required]);
      editorial.setValidators([Validators.required]);
      libro.setValidators([Validators.required]);
      referencia.setValidators([Validators.required]);
    }
  }

  SelectedPublicationType(event) {
    const opcion = event.target.value;

    this.UpdateForm(opcion);
  }
}
