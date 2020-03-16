import { Injectable } from '@angular/core';
import {User} from 'src/app/Models/user.model'
@Injectable({
  providedIn: 'root'
})
export class UserService {

  user= new User();


  constructor() {

      this.user.username="";
      this.user.type="-1";
   }

  setUserName(name:string)
  {
      this.user.username=name
  }
  setUserType(type: string)
  {
    this.user.type= type;
  }

  getUserName()
  {
      return this.user.username;
  }
  getUserType()
  {
    return this.user.type;
  }
}
