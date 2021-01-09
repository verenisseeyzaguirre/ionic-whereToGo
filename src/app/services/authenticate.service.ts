import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  userFilters = [];
  constructor() {}
  async signIn(credentials: any) {
    const options = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };
    const response = await fetch(environment.authUserApi.baseUrl, options);
    let users = await response.json();
    this.userFilters = users.filter(
      (user: any) =>
        user.email === credentials.email &&
        user.password === btoa(credentials.password)
    );

    if (this.userFilters.length > 0) {
      return {
        error: false,
        isAuthenticated: true,
        message: '',
        data: this.userFilters[0],
      };
    } else {
      return {
        error: false,
        isAuthenticated: false,
        message: 'Usuario y/o contraseña incorrecta.',
        data: {},
      };
    }
  }
}
