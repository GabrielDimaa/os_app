import { Injectable } from '@angular/core';
import { ApiHttpClient } from "../../shared/api/api-http-client";
import { OsPaginatorAPI, OsPaginatorModel, OsPaginatorParams } from "../models/os-paginator-model";
import { HttpParams } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { EquipamentoAPI, EquipamentoModel } from "../models/equipamento.model";
import { OsSituacaoAPI, OsSituacaoModel } from "../models/os-situacao.model";

@Injectable({
  providedIn: 'root'
})
export class OsService {
  constructor(private api: ApiHttpClient) {}

  public getAllWithPagination(params: OsPaginatorParams): Observable<OsPaginatorModel> {
    const httpParams = new HttpParams()
      .set('page', String(params.page))
      .set('per_page', String(params.perPage));

    return this.api.get<OsPaginatorAPI>("os", httpParams)
      .pipe(
        map(response => OsPaginatorModel.fromJson(response)),
        catchError(err => throwError(() => Error(err.message)))
      );
  }

  public getEquipamentos(): Observable<EquipamentoModel[]> {
    return this.api.get<EquipamentoAPI[]>("equipamento")
      .pipe(
        map(response => response.map(e => EquipamentoModel.fromJson(e))),
        catchError(err => throwError(() => Error(err.message)))
      );
  }

  public getOsSituacoes(): Observable<OsSituacaoModel[]> {
    return this.api.get<OsSituacaoAPI[]>("os-situacao")
      .pipe(
        map(response => response.map(e => OsSituacaoModel.fromJson(e))),
        catchError(err => throwError(() => Error(err.message)))
      );
  }
}
