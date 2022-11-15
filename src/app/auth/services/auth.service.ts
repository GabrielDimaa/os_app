import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import LoginModel from "../models/login.model";
import { KEY_TOKEN } from '../../shared/storage/keys/keys';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private jwtHelper: JwtHelperService) {
  }

  async login(model: LoginModel): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 2500));

    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";

    localStorage.setItem(KEY_TOKEN, token);
  }

  async logout(): Promise<void> {
    localStorage.removeItem(KEY_TOKEN);
  }

  autenticado(): boolean {
    try {
      const token = localStorage.getItem(KEY_TOKEN);
      return !this.jwtHelper.isTokenExpired(token ?? "");
    } catch (e) {
      return false;
    }
  }
}
