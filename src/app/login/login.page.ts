import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  loginForm: FormGroup;
  responseAuthenticateUser: any = {};
  messageAuthenticated: string;
  validationMessages = {
    email: [
      { type: 'required', message: 'El email es requerido.' },
      { type: 'pattern', message: 'El email no es válido.' },
    ],
    password: [
      { type: 'required', message: 'La contraseña es requerida.' },
      {
        type: 'minlength',
        message: 'La contraseña debe tener un minino de 5 caracteres.',
      },
    ],
  };
  constructor(
    private formBuilder: FormBuilder,
    private authenticateUser: AuthenticateService,
    private navController: NavController
  ) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl(
        'srdelarosab@gmail.com',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '123456',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
    });
  }
  async loginUser(credentials: any) {
    try {
      this.responseAuthenticateUser = await this.authenticateUser.signIn(
        credentials
      );
      if (this.responseAuthenticateUser.isAuthenticated) {
        this.navController.navigateForward('/home');
      } else {
        this.messageAuthenticated = this.responseAuthenticateUser.message;
      }
    } catch (error) {
      console.log(error);
    }
  }
}