import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../Services/user.service';
@Component({
  selector: 'app-usuarios-list',
  templateUrl: './usuarios-list.component.html',
  styleUrls: ['./usuarios-list.component.css']
})
export class UsuariosListComponent implements OnInit {

  isLogged;
  tipo:string;
  constructor(private userservice: UserService) { 

    if (this.userservice.getUserType()=="-1")
    {
       this.isLogged=false;
       this.tipo= '-1';
       
    }
    else
    {
      this.isLogged=true;
      this.tipo= this.userservice.getUserType();
    }


  }

  ngOnInit() {



  }

}
