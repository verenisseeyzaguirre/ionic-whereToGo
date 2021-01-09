import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(private navController: NavController, private storage: Storage) {}
  logout() {
    this.storage.remove('isAuthenticated');
    //this.storage.set('isAuthenticated', false);
    this.navController.navigateRoot('/login');
  }
}
