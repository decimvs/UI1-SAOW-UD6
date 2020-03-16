import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {PublicacionModel} from '../../Models/PublicacionModel';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://5cnf5hz0fb.execute-api.us-east-1.amazonaws.com/ud5_saow/';

  getAllPublicaciones() {
    return this.http.get<any>(this.baseUrl + 'publicaciones');
  }

  addPublicacion(publicacion: PublicacionModel) {
    return this.http.post(this.baseUrl + 'publicaciones', publicacion);
  }

  editPublicacion(publicacion: PublicacionModel, id: string) {
    return this.http.put(this.baseUrl + 'publicaciones/' + id, publicacion);
  }

  getPublicacion(id: string) {
    return this.http.get<any>(this.baseUrl + 'publicaciones/' + id);
  }

  getAllAutores() {
    return this.http.get<any>(this.baseUrl + 'autores');
  }

  deletePublicacion(id: string) {
    return this.http.delete(this.baseUrl + 'publicaciones/' + id);
  }

  getPublicacionesAutor(id: string) {
    return this.http.get<any>(this.baseUrl + 'publicaciones/autor/' + id);
  }
}
