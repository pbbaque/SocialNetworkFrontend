import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-avatar-picker',
  templateUrl: './avatar-picker.component.html',
  styleUrls: ['./avatar-picker.component.scss'],
  standalone: false
})
export class AvatarPickerComponent  implements OnInit {

  @Input() userAvatar:string | undefined = 'av-1.png';
  @Output() avatarPick = new EventEmitter<string>();

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
  ];

  constructor() { }

  ngOnInit() {
    this.avatars.forEach(av => av.seleccionado = false);
    for( const avatar of this.avatars) {
      if(avatar.img === this.userAvatar){
        avatar.seleccionado = true;
        break;
      }
    }
  }

  selectAvatar(avatar:any) {
    this.avatars.forEach(av => av.seleccionado = false);
    avatar.seleccionado = true;
    console.log(avatar.img);
    this.avatarPick.emit(avatar.img);
  }

}
