import { Injectable } from '@angular/core';
import { KEY_TOKEN } from '../../shared/storage/keys/keys';
import { LoginModel } from "../models/login.model";
import { ApiHttpClient } from "../../shared/api/api-http-client";
import { catchError, firstValueFrom, map, Observable, throwError } from "rxjs";
import jwt_decode from "jwt-decode";
import { UsuarioAPI, UsuarioModel } from "../../os/models/usuario.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private api: ApiHttpClient) {
  }

  public async login(model: LoginModel): Promise<void> {
    try {
      const response = await firstValueFrom(this.api.post<LoginResponse>("auth/login", model.toJson()));

      localStorage.setItem(KEY_TOKEN, response.access_token);
    } catch (err: any) {
      if (err.status == 401)
        throw Error("Nome de usuário ou senha incorretos.");

      throw Error(err.message);
    }
  }

  public refreshToken(): Observable<void> {
    return this.api.post<RefreshTokenResponse>("auth/refresh-token")
      .pipe(
        map(response => localStorage.setItem(KEY_TOKEN, response.refresh_token)),
        catchError(err => {
          localStorage.removeItem(KEY_TOKEN);
          return throwError(() => Error("Sessão expirada. Faça login novamente."))
        })
      );
  }

  public async logout(): Promise<void> {
    try {
      await firstValueFrom(this.api.post("auth/logout"));
      localStorage.removeItem(KEY_TOKEN);
    } catch (err: any) {
      throw Error(err.message);
    }
  }

  public getUsuarioLogado(): UsuarioModel | null {
    try {
      const token: string | null = localStorage.getItem(KEY_TOKEN);
      const decode = jwt_decode(token ?? "") as UsuarioAPI | undefined | null;

      if (!decode || !decode.id_usuario) return null;

      return new UsuarioModel(decode.id_usuario, decode.login_usuario, decode.perfil, decode.nome, false);
    } catch (err: any) {
      return null;
    }
  }
}

type LoginResponse = {
  access_token: string;
}

type RefreshTokenResponse = {
  refresh_token: string;
}
