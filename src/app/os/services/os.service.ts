import { Injectable } from '@angular/core';
import { ApiHttpClient } from "../../shared/api/api-http-client";
import { OsPaginatorAPI, OsPaginatorModel, OsPaginatorParams } from "../models/os-paginator-model";
import { HttpParams } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OsService {
  constructor(private api: ApiHttpClient) {}

  public getAllWithPagination(params: OsPaginatorParams): Observable<OsPaginatorModel> {
    const httpParams = new HttpParams()
      .set('page', String(params.page))
      .set('per_page', String(params.perPage));

    return this.api.get<OsPaginatorAPI>("os", httpParams).pipe(
      map(response => OsPaginatorModel.fromJson(response)),
      catchError(err => throwError(() => Error(err.message)))
    );
  }
}
