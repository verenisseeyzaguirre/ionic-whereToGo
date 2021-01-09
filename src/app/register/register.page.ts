import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage {
  registerForm: FormGroup;
  validationMessages = {
    firstName: [{ type: 'required', message: 'El nombre es requerido.' }],
    lastName: [{ type: 'required', message: 'Los apellidos son requeridos.' }],
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
    private navController: NavController,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.compose([Validators.required])),
      lastName: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ])
      ),
      password: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(6)])
      ),
    });
  }
  goToLogin() {
    this.navController.navigateRoot('/login');
  }

  registerUser(userToRegister: any) {
    console.log(userToRegister);
  }
}
