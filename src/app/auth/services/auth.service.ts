import { Injectable } from '@angular/core';
import { KEY_TOKEN } from '../../shared/storage/keys/keys';
import { LoginModel } from "../models/login.model";
import { ApiHttpClient } from "../../shared/api/api-http-client";
import { HttpErrorResponse } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private api: ApiHttpClient) {
  }

  async login(model: LoginModel): Promise<void> {
    try {
      const response = await this.api.post("auth/login", model.toJson());
      localStorage.setItem(KEY_TOKEN, response.access_token);
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        if (e.status == 401)
          throw Error("Nome de usuário ou senha incorretos.");

        throw Error(e.message);
      }

      throw e;
    }
  }

  async logout(): Promise<void> {
    await this.api.post("auth/logout");
    localStorage.removeItem(KEY_TOKEN);
  }
}
