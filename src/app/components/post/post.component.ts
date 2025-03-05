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

  img1: string = "/assets/img/perro-1.jpg";
  img2: string = "/assets/img/perro-2.jpg";
  img3: string = "/assets/img/perro-3.jpg";
  
  @Input() post: Post = {};

  constructor() { }

  ngOnInit() {}

}
