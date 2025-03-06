import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/interfaces/post.interface';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page implements OnInit {

  posts: Post[] = [];

  enabled: boolean = true;

  constructor( private postsService: PostsService ) {}


  ngOnInit(): void {
    this.nexts();

    this.postsService.newPost.subscribe( post => {
      this.posts.unshift( post );
    });
  }

  reload( event: any ){
    this.nexts( event, true );
    this.enabled = true;
    this.posts = [];
  }

  nexts( event?: any, pull: boolean = false ) {
    this.postsService.getPosts( pull )
    .subscribe( 
      resp => {
        console.log(resp)
        this.posts.push( ...resp.posts );
        if( event ){
          event.target.complete();
          if( resp.posts.length === 0 )
            this.enabled = false;
        }
    });
  }
}
