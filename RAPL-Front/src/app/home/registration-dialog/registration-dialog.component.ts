import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { RegMember } from 'src/app/_models/member';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-registration-dialog',
  templateUrl: './registration-dialog.component.html',
  styleUrls: ['./registration-dialog.component.css']
})
export class RegistrationDialogComponent implements OnInit {
  regForm: FormGroup;
  depts = ['CSE', 'ECE'];
  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<RegistrationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: boolean,
              private userService: UserService,
              private authService: AuthService) { }

  ngOnInit() {
    this.createRegForm();
  }

  createRegForm() {
    this.regForm = this.formBuilder.group(
      {
        username: [''],
        password: [''],
        department: [''],
        roll: ['']
      }
    );
  }
  registration() {
    const member = new RegMember();
    member.username = this.regForm.controls['username'].value;
    member.password = this.regForm.controls['password'].value;
    member.dept = this.regForm.controls['department'].value;
    member.roll = this.regForm.controls['roll'].value;
    this.authService.register(member).subscribe(next => {
      alertify.success('Registration Successful');
      this.dialogRef.close({data: true});
    }, error => {
      alertify.error(error.error);
    });
  }
  cancel() {
    this.dialogRef.close({data: true});
  }
  changeDept($event: any) {

  }

}
