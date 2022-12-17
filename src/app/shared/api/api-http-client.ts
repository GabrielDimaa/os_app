import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { firstValueFrom, Observable } from "rxjs";
import { KEY_TOKEN } from "../storage/keys/keys";

@Injectable()
export class ApiHttpClient {
  constructor(private httpClient: HttpClient) {}

  async post(url: string, body?: any, retry: boolean = true): Promise<any> {
    try {
      const response = await firstValueFrom<HttpResponse>(this.httpClient.post<HttpResponse>(url, body));

      if (response.success) {
        return response.data;
      }
    } catch (e) {
      if (e instanceof HttpErrorResponse) {
        // if (e.status) {
        //   if (retry) {
        //     const refresh = await this.refreshToken();
        //     if (refresh) return this.post(url, body, false);
        //   }
        // }

        if (e.status == 0) {
          throw Error("Não foi possível se comunicar com o servidor.");
        }

        throw Error(e.message);
      }

      throw Error("Ocorreu algum erro interno.");
    }
  }

  public async refreshToken(): Promise<boolean> {
    const existeToken = localStorage.getItem(KEY_TOKEN);
    if (existeToken) {
      const response = await firstValueFrom<HttpResponse>(this.httpClient.post<HttpResponse>("auth/refresh-token", null));

      if (response.success) {
        localStorage.setItem(KEY_TOKEN, response.data.refresh_token);
        return true;
      }
    }

    return false;
  }
}

interface HttpResponse {
  success: boolean;
  data: any;
}
