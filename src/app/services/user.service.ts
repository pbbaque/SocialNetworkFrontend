import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { environment } from 'src/environments/environment';
import { UserResponse } from '../interfaces/responses.interface';
import { User } from '../interfaces/user.interface';
import { NavController } from '@ionic/angular';

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _storage: Storage | null = null;
  token: string = '';
  private user: User = {};
  
  constructor( private http: HttpClient, private storage: Storage, private navCtrl: NavController ) { 
    this.init();
  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }

  login( user:User) {

    const data = {email:user.email, password:user.password};

    return new Promise( resolve => {
      this.http.post<UserResponse>(`${URL}/user/login`, data).subscribe( resp => {
        console.log(resp);
  
        if( resp.ok ){
          this.saveToken(resp.token);
          resolve(true);
        } else {
          this.token = '';
          this._storage?.clear();
          resolve(false);
        }
      }, err => {
        console.log(err);
        this.token = '';
        this._storage?.clear();
        resolve(false);
      });
    });

  }

  register( user: User ) {
    return new Promise( resolve => {
      this.http.post<UserResponse>(`${ URL }/user/create`, user).subscribe( resp => {
        if( resp.ok ){
          this.saveToken(resp.token);
          resolve(true);
        } else {
          this.token = '';
          this._storage?.clear();
          resolve(false);
        }
      }, err => {
        console.log(err);
        this.token = '';
        this._storage?.clear();
        resolve(false);
      });    
    });
  }

  update(user: User) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise( resolve => {
      this.http.put<UserResponse>(`${URL}/user/update`, user, {headers}).subscribe( resp => {
        if(resp.ok) {
          this.saveToken(resp.token);
          resolve(true);
        } else {
          resolve(false);
        }
      }, err =>{
        console.log(err);
        resolve(false);
      });

    });
  }

  getuser() {

    if( !this.user._id ) 
      this.checkToken();

    return { ...this.user };
  }

  async saveToken( token: string ) {
    this.token = token;
    await this._storage?.set('token', token);
  }

  async loadToken() {
    this.token = await this._storage?.get('token') || null;
  }

  async checkToken(): Promise<boolean> {

    await this.loadToken();

    if (!this.token ) {
      this.navCtrl.navigateRoot('/login');
      return Promise.resolve(false);
    }

    const headers = new HttpHeaders({
      'x-token': this.token
    });

    return new Promise<boolean>( resolve => {
      this.http.get<UserResponse>(`${URL}/user/`, {headers}).subscribe(resp => {
        if(resp.ok && resp.user) {
            this.user = resp.user;
            resolve(true);
        } else {
          resolve(false);
        }
      }, err => {
        resolve(false);
      });
    });
  }

}
