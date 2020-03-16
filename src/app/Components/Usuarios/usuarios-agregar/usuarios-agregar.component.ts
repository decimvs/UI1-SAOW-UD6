import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CognitoAuth} from '../../../../Auth/CognitoAuth';

@Component({
  selector: 'app-usuarios-agregar',
  templateUrl: './usuarios-agregar.component.html'
})
export class UsuariosAgregarComponent implements OnInit {

  addUsuario: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.addUsuario = this.formBuilder.group({
      nombre: [],
      apellidos: [],
      email: [],
      nuser: [],
      password: [],
    });
  }

  onSubmit() {
    if (this.addUsuario.valid) {
      const auth = new CognitoAuth();
      const values = this.addUsuario.value;

      auth.signup(values.nuser, values.nombre, values.apellidos, values.email, values.password, this.signupCallback.bind(this));
    }
  }

  signupCallback(err, data) {
    if (err) {
      alert('Se produjo un error durante el registro y no se ha completado el proceso.');
    } else {
      if (!data.UserConfirmed) {
        const verificationCode = prompt('Se ha enviado un código de verificación a tu dirección de correo. ' +
          'Este paso es necesario para poder activar tu cuenta de usuario. ' +
          'Por favor introduce el código que aparece en el correo de activación: ', '');
        const auth = new CognitoAuth();

        auth.confirmRegistration(data.user.username, verificationCode, this.confirmCallback.bind(this));
      } else {
        alert('El registro de usuario se ha realizado correctamente. Ya puedes iniciar sesión');
      }
    }
  }

  confirmCallback(response) {
    if (response === null) {
      alert('El registro se completó correctamente. Ya puedes iniciar sesión.');
    } else {
      alert('Ocurrió un error durante el proceso de confirmación de la cuenta');
    }
  }
}
