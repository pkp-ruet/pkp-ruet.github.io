import { Component, OnInit } from '@angular/core';
import { Member } from './_models/member';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'RAPL-Front';
  jwtHelper = new JwtHelperService();
  constructor(private authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    const member: Member = JSON.parse(localStorage.getItem('member'));
    if (token) {
    this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
    if (member) {
      this.authService.currentMember = member.username;
    }
  }
}
