import { Component, OnInit } from '@angular/core';
import { UserService } from './auth/user.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from './auth/profile/profile.component';
import { ShopService } from './shop/shop.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'app-kva-fitness';
  profileOpened: boolean = false;

  constructor(public userService: UserService, public dialog: MatDialog){}

  ngOnInit(): void {
    ShopService.initializeItemList(this.userService);
  }

  openProfile(id: number){
    this.profileOpened = true;
    const profileDialog = this.dialog.open(ProfileComponent, {
      disableClose: true,
      width: '50vw',
      data: {user: this.userService.getUserById(id)}
    });

    profileDialog.afterClosed().subscribe((r) => {
      this.profileOpened = false;
    })
  }
}
