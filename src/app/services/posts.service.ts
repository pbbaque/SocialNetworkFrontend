import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PostResponse, PostsResponse } from '../interfaces/responses.interface';
import { Post } from '../interfaces/post.interface';
import { UserService } from './user.service';
 

const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  postsPage = 0;

  newPost = new EventEmitter<Post>();

  constructor( private http: HttpClient, private userService: UserService ) { }

  getPosts( pull: boolean ) {

    if( pull )
      this.postsPage = 0;
    
    this.postsPage ++;

    return this.http.get<PostsResponse>(`${ URL }/post/?page=${ this.postsPage }`);
  }

  create( post: Post) {
    const headers = new HttpHeaders({
      'x-token': this.userService.token
    });

    return new Promise( resolve => {
      this.http.post<PostResponse>(`${URL}/post/create`, post, {headers}).subscribe(resp => {
        this.newPost.emit(resp.post);
        resolve(true);
      }, err => 
        resolve(false)
      );
    });
  }

  upload(file: File) {
    console.log('Archivo a subir:', file);  // Verifica si el archivo tiene datos
    const formData = new FormData();
    formData.append('image', file);
  
    const headers = new HttpHeaders({
      'x-token': this.userService.token
    });
  
    return new Promise(resolve => {
      this.http.post(`${URL}/post/upload`, formData, { headers }).subscribe(
        resp => {
          console.log('Respuesta del backend:', resp);
          resolve(true);
        },
        err => {
          console.error('Error al subir la imagen:', err);
          resolve(false);
        }
      );
    });
  }
  

}
