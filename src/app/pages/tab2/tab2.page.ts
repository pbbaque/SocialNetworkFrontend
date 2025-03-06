import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/interfaces/post.interface';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

  tempImages: string[] = [];

  post: Post | any = {
    message: '',
    coords: ''
  };

  constructor(private postsService: PostsService, private route: Router) {}


  async create(){
    console.log(this.post.message);
    await this.postsService.create(this.post);
    this.post = {};

    this.route.navigateByUrl('/main/tabs/tab1');
  }

}
