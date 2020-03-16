import { Injectable } from '@angular/core';
import {AutorModel} from '../../Models/AutorModel';
import {AutorData} from '../../Data/AutorData';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AutorService {

  constructor(private http: HttpClient) { }

  baseUrl = 'https://5cnf5hz0fb.execute-api.us-east-1.amazonaws.com/ud5_saow/';

  getAutores() {
    return this.http.get<any>(this.baseUrl + 'autores');
  }

  addAutor(autor: AutorModel) {
    return this.http.post(this.baseUrl + 'autores', autor);
  }

  editAutor(autor: AutorModel, id: string) {
    return this.http.put(this.baseUrl + 'autores/' + id, autor);
  }

  getAutor(id: string) {
    return this.http.get<any>(this.baseUrl + 'autores/' + id);
  }

  deleteAutor(id: string) {
    return this.http.delete(this.baseUrl + 'autores/' + id);
  }

  getPublicacionesAutor(id: string) {
    return this.http.get<any>(this.baseUrl + 'publicaciones/autor/' + id);
  }





}
