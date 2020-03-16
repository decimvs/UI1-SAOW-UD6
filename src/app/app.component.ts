import {AfterViewInit, Component, OnInit} from '@angular/core';
import * as Feather from 'feather-icons';
import {UserService} from './Services/user.service';
import {CognitoAuth} from '../Auth/CognitoAuth';
import {Subject} from 'rxjs';
import {AuthService} from '../Auth/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

  username;

  constructor(private authService: AuthService) {}

  ngAfterViewInit(): void {
    Feather.replace();
  }

  isAuthenticated(): boolean {
      if (this.authService.isAuthenticated()) {
        this.username = localStorage.getItem('usuario');
        return true;
      } else {
        return false;
      }
  }
}

