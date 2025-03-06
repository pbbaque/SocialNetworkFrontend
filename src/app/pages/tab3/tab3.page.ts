import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/interfaces/user.interface';
import { UiService } from 'src/app/services/ui.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {

  user: User = {
    avatar: ''
  };

  constructor( private userService: UserService, private uiService: UiService ) {}

  ngOnInit(): void {
      this.user = this.userService.getuser();
  }

  async update(fUpdate: NgForm) {
    if(fUpdate.invalid)
      return;

    const valid = await this.userService.update( this.user );

    if (valid) {
      this.uiService.presentToast('Usuario actualizado correctamente');
    } else {
      this.uiService.presentToast('No se pudo actualizar el usuario');
    }
      
  }

  logOut(){

  }

}
