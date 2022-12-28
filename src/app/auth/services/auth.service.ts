import { Injectable } from '@angular/core';
import { KEY_TOKEN } from '../../shared/storage/keys/keys';
import { LoginModel } from "../models/login.model";
import { ApiHttpClient } from "../../shared/api/api-http-client";
import { catchError, firstValueFrom, map, Observable, throwError } from "rxjs";

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
}

type LoginResponse = {
  access_token: string;
}

type RefreshTokenResponse = {
  refresh_token: string;
}
