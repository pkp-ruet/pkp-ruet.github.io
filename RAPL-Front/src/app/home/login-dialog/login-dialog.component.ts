import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { LoginUser } from 'src/app/_models/member';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<LoginDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: boolean,
              private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
    this.createLoginForm();
  }
  createLoginForm() {
    this.loginForm = this.formBuilder.group(
      {
        username: [''],
        password: ['']
      }
    );
  }
  logIn() {
    const user = new LoginUser();
    user.username = this.loginForm.controls['username'].value;
    user.password = this.loginForm.controls['password'].value;
    this.authService.login(user).subscribe(next =>{
      alertify.success('Login Successfully');
      this.dialogRef.close({data: true});
    }, error => {
      alertify.error(error.error);
    });
  }
  cancel() {
    this.dialogRef.close();
  }
}
