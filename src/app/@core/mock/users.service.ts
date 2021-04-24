import { of as observableOf,  Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserData } from '../data/users';

@Injectable()
export class UserService extends UserData {

  private time: Date = new Date;

  private users = {
    john: { name: 'John Snow', picture: null },
  };


  getUsers(): Observable<any> {
    return observableOf(this.users);
  }
}
