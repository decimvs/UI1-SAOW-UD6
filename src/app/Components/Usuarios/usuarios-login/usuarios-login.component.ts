import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CognitoAuth} from '../../../../Auth/CognitoAuth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-usuarios-login',
  templateUrl: './usuarios-login.component.html'
})
export class UsuariosLoginComponent implements OnInit {

  login: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.login = this.formBuilder.group({
      usuario: [],
      password: [],
    });
  }

  verificarDatos() {
    if (this.login.valid) {
      const auth = new CognitoAuth();

      // user: 'miliki', pass: 'Fujitsu_20'
      auth.authenticate(this.login.get('usuario').value, this.login.get('password').value, this.Callback.bind(this));
    }
  }

  Callback(succes, data) {
    if (succes) {
      localStorage.setItem('token', data.getAccessToken().getJwtToken());
      localStorage.setItem('usuario', this.login.get('usuario').value);
      console.log('Login OK');
      this.router.navigate(['dashboard']);
    } else {
      alert('No se ha podido iniciar sesión. Verifique sus datos');
      console.log('Error login');
    }
  }
}
