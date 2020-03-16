import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-usuarios-logout',
  templateUrl: './usuarios-logout.component.html'
})
export class UsuariosLogoutComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    localStorage.setItem('token', '');
    this.router.navigate(['login']);
  }

}
