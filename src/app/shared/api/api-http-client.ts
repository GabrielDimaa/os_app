import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import HttpErrorException from "../exceptions/http-error-exception";

@Injectable()
export class ApiHttpClient {
  constructor(private httpClient: HttpClient) {}

  public async post(url: string, body?: any): Promise<any> {
    try {
      const response = await firstValueFrom<HttpResponse>(this.httpClient.post<HttpResponse>(url, body));

      if (response.success) {
        return response.data;
      }
    } catch (e) {
      this.throwable(e);
    }
  }

  public async get(url: string): Promise<any> {
    try {
      const response = await firstValueFrom<HttpResponse>(this.httpClient.get<HttpResponse>(url));

      if (response.success) {
        return response.data;
      }
    } catch (e) {
      this.throwable(e);
    }
  }

  private throwable(e: unknown): void {
    if (e instanceof HttpErrorResponse) {
      if (e.status == 0) {
        throw new HttpErrorException("Não foi possível se comunicar com o servidor.", e.status);
      }

      if (e.error.message)
        throw new HttpErrorException(e.error.message, e.status);

      throw new HttpErrorException(e.message, e.status);
    }

    throw new HttpErrorException("Ocorreu algum erro interno.", 500);
  }
}

interface HttpResponse {
  success: boolean;
  data: any;
}
