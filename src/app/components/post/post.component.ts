import { Component, Input, OnInit } from '@angular/core';
import { register } from 'swiper/element/bundle';

import { Post } from 'src/app/interfaces/post.interface';

register();

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  standalone: false
})
export class PostComponent  implements OnInit {
  
  showCoords: boolean = false;
  like: boolean = false;

  @Input() post: Post = {};

  constructor() { }

  ngOnInit() {}

  changeShowCoords() {
    this.showCoords = !this.showCoords ;
    console.log(this.showCoords)
  }

  setLike(){
    this.like = !this.like;
  }

}
