import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import HttpErrorException from "../exceptions/http-error-exception";

@Injectable()
export class ApiHttpClient {
  constructor(private httpClient: HttpClient) {}

  public post<T>(url: string, body?: any): Observable<T> {
    return this.httpClient.post<HttpResponse>(url, body)
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  public get<T>(url: string, params?: HttpParams): Observable<T> {
    return this.httpClient.get<HttpResponse>(url, { params: params })
      .pipe(
        map(response => response.data),
        catchError(this.handleError)
      );
  }

  private handleError(e: any): Observable<never> {
    if (e instanceof HttpErrorResponse) {
      if (e.status == 0) {
        return throwError(() => new HttpErrorException("Não foi possível se comunicar com o servidor.", e.status));
      }

      if (e.error.message) {
        return throwError(() => new HttpErrorException(e.error.message, e.status));
      }
    }

    if (e instanceof Error) {
      return throwError(() => e);
    }

    return throwError(() => new HttpErrorException("Ocorreu algum erro interno.", 0));
  }
}

interface HttpResponse {
  success: boolean;
  data: any;
}
