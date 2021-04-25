import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
  })
  export class SessionService {
    private accessToken: string = "";
    private refreshToken: string = "";
  
    constructor(
      private cookieService: CookieService
    ) {
     
    }
   
    setAccessToken(access_token) {
      this.accessToken = access_token
      this.cookieService.set('access_token', access_token);
    }
  
    getAccessToken() {
      if (this.cookieService.get('access_token')) {
        return this.cookieService.get('access_token');
      }
      else if (this.accessToken) {
        return this.accessToken;
      } else {
        return null;
      }
    }

    setRefreshToken(refresh_token) {
      this.refreshToken = refresh_token
      this.cookieService.set('refresh_token', refresh_token)
    }

    getRefreshToken() {
      if(this.cookieService.get('refresh_token')) {
        return this.cookieService.get('refresh_token')
      }
      else if(this.refreshToken) {
        return this.refreshToken
      }else {
        return null
      }
    }
  
    deleteAll() {
      this.cookieService.deleteAll();
    }
  }