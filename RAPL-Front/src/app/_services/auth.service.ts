import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginUser, Member, RegMember } from '../_models/member';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper = new JwtHelperService();
  currentMember: string;
  decodedToken: any;

constructor(private http: HttpClient) { }

login(user: LoginUser) {
  const url = 'http://localhost:5000/api/Auth/Login';
  const bbody = JSON.stringify(user);
  const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  return this.http.post(url, bbody, {headers: headers}).pipe(
    map((response: any)=> {
      if(response) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('member', JSON.stringify(response.member));
        this.decodedToken = this.jwtHelper.decodeToken(response.token);
        this.currentMember = response.member.userName;
      }
    })
  );
}

register(member: RegMember) {
  const url = 'http://localhost:5000/api/Auth/Register';
  const bbody = JSON.stringify(member);
  const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8'});
  return this.http.post(url, bbody, {headers: headers}).pipe(
    map((response: any)=> {
      if(response) {
      const loginUser = new LoginUser();
      loginUser.username = response.userName;
      loginUser.password = response.password;
      this.login(loginUser).subscribe();
      }
    })
  );
}

logOut() {
  localStorage.removeItem('token');
  localStorage.removeItem('member');
}

}
