import { Injectable } from '@angular/core';
import { KEY_TOKEN } from '../../shared/storage/keys/keys';
import { LoginModel } from "../models/login.model";
import { ApiHttpClient } from "../../shared/api/api-http-client";
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private api: ApiHttpClient) {
  }

  public async login(model: LoginModel): Promise<void> {
    try {
      const response = await firstValueFrom(this.api.post<any>("auth/login", model.toJson()));

      localStorage.setItem(KEY_TOKEN, response.access_token);
    } catch (err: any) {
      if (err.status == 401)
        throw Error("Nome de usuário ou senha incorretos.");

      throw Error(err.message);
    }
  }
}
