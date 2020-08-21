import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginDialogComponent } from '../login-dialog/login-dialog.component';
import { RegistrationDialogComponent } from '../registration-dialog/registration-dialog.component';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn = false;
  registerd = false;
  loggedInUserName: string;
  title = 'RAPL';
  constructor(private authService: AuthService,
              private dialog: MatDialog) { 
                if(this.authService.currentMember) {
                  this.loggedIn = true;
                }
              }

  ngOnInit() {
  }
  logOut() {
    this.authService.logOut();
    this.loggedIn = false;
  }
  openLoginDialog() {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '300px',
      data: {},
    });
    dialogRef.updatePosition({ top: '100px', left: '500px' });
    dialogRef.afterClosed().subscribe(response => {
      if(response.data === true) {
          this.loggedIn = true;
          this.loggedInUserName = this.authService.currentMember;
          console.log(this.loggedInUserName);
      }
    });
  }

  openRegistrationDialog() {
    const dialogRef = this.dialog.open(RegistrationDialogComponent, {
      width: '300px',
      data: {},
    });
    dialogRef.updatePosition({ top: '100px', left: '500px' });
    dialogRef.afterClosed().subscribe(response => {
      if(response.data === true) {
        this.loggedIn = true;
        this.loggedInUserName = this.authService.currentMember;
      }
    });
  }

}
