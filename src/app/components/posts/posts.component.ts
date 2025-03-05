import { Component, Input, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post.interface';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  standalone: false
})
export class PostsComponent  implements OnInit {
  @Input() posts: Post[] = [];
  constructor() { }

  ngOnInit() {
  }

}
