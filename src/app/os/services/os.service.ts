import { Injectable } from '@angular/core';
import { ApiHttpClient } from "../../shared/api/api-http-client";
import { OsPaginatorAPI, OsPaginatorModel } from "../models/os-paginator.model";
import { HttpParams } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { EquipamentoAPI, EquipamentoModel } from "../models/equipamento.model";
import { OsSituacaoAPI, OsSituacaoModel } from "../models/os-situacao.model";
import { OsFilterParams, OsPaginatorParams } from "../params/os.params";
import "../../shared/prototypes/string.prototype";
import "../../shared/prototypes/date.prototype";

@Injectable({
  providedIn: 'root'
})
export class OsService {
  constructor(private api: ApiHttpClient) {}

  public getAllWithPagination(paginatorParams: OsPaginatorParams, filterParams: OsFilterParams | null = null): Observable<OsPaginatorModel> {
    let httpParams = new HttpParams()
      .set('page', String(paginatorParams.page))
      .set('per_page', String(paginatorParams.perPage));

    if (filterParams) {
      if (filterParams.dataInicial) httpParams = httpParams.set('data_inicial', filterParams.dataInicial.convertToDate().toJSONLocal());
      if (filterParams.dataFinal) {
        const dataFinal = filterParams.dataFinal.convertToDate();
        dataFinal.setHours(23, 59, 59);
        httpParams = httpParams.set('data_final', String(dataFinal.toJSONLocal()));
      }
      if (filterParams.codigo) httpParams = httpParams.set('codigo', filterParams.codigo);
      if (filterParams.situacao) httpParams = httpParams.set('situacao', filterParams.situacao.id);
      if (filterParams.cliente) httpParams = httpParams.set('cliente', filterParams.cliente.nome);
      if (filterParams.equipamento) httpParams = httpParams.set('equipamento', filterParams.equipamento.id);
      if (filterParams.identificador) httpParams = httpParams.set('equipamento_item', filterParams.identificador.id);
    }

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
