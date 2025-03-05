import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './post/post.component';
import { IonicModule } from '@ionic/angular';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PipesModule } from '../pipes/pipes.module';
import { AvatarPickerComponent } from './avatar-picker/avatar-picker.component';



@NgModule({
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  declarations: [
    PostsComponent,
    PostComponent,
    AvatarPickerComponent
  ],
  exports: [
    PostsComponent,
    AvatarPickerComponent
  ],
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    PipesModule
  ]
})
export class ComponentsModule { }
