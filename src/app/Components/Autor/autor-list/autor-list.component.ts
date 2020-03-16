import { Component, OnInit } from '@angular/core';
import {AutorModel} from '../../../../Models/AutorModel';
import {AutorService} from '../../../Services/autor.service';

@Component({
  selector: 'app-autor-list',
  templateUrl: './autor-list.component.html',
  styleUrls: ['./autor-list.component.css']
})
export class AutorListComponent implements OnInit {

  autores: AutorModel[];

  constructor(private autorService: AutorService) { }

  ngOnInit() {

    this.autorService.getAutores().subscribe(data => {
      
      this.autores = data.Items;
      
    });

    
  }

}
