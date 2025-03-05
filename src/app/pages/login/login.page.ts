import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonRouterOutlet, NavController } from '@ionic/angular';
import { User } from 'src/app/interfaces/user.interface';
import { UiService } from 'src/app/services/ui.service';
import { UserService } from 'src/app/services/user.service';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {

  flag: boolean = true;

  user: User = {
    email: '',
    password: '',
    name: '',
    avatar: ''
  }

  constructor( private userService: UserService, private navCtrl: NavController, private uiService: UiService, private routerOutlet: IonRouterOutlet ) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    // Forzar la recarga de estilos al entrar en la página
    this.routerOutlet.swipeGesture = false;
  }
  ngOnDestroy() {
    const head = document.getElementsByTagName('head')[0];
    const links = head.getElementsByTagName('link');
    for (let i = 0; i < links.length; i++) {
      if (links[i].href.includes('theme.css')) {
        head.removeChild(links[i]);
      }
    }
  }
  
  async login( fLogin: NgForm ){

    if( fLogin.invalid ) 
      return;

    const valid = await this.userService.login( this.user );

    if( valid ) {
      //navigate to tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated:true });
    } else {
      //alert error user or pass not valid message
      this.uiService.presentAlert('Usuario o contraseña incorrectos');
      this.user = {
        email: '',
        password: '',
        name: '',
        avatar: ''
      }
    }


  }

  async register( fRegister: NgForm ){

    if( fRegister.invalid ) 
      return;

    const valid = await this.userService.register( this.user );

    if( valid ) {
      //navigate to tabs
      this.navCtrl.navigateRoot('/main/tabs/tab1', { animated:true });
    } else {
      //alert error duplicate email
      this.uiService.presentAlert('El correo electronico ya tiene una cuenta');
      this.user = {
        email: '',
        password: '',
        name: '',
        avatar: ''
      }
    }
  }

  showRegister() {
    this.flag = false;
    this.user = {
      email: '',
      password: '',
      name: '',
      avatar: ''
    }
  }
  
  showLogin() {
    this.flag = true;
    this.user = {
      email: '',
      password: '',
      name: '',
      avatar: ''
    }
  }

}
