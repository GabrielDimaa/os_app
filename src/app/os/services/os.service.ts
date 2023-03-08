import { Injectable } from '@angular/core';
import { ApiHttpClient } from "../../shared/api/api-http-client";
import { HttpParams } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";
import { OsPaginatorAPI, OsPaginatorModel } from "../models/os-paginator.model";
import { OsSituacaoAPI, OsSituacaoModel } from "../models/os-situacao.model";
import { OsFilterParams, OsPaginatorParams } from "../params/os.params";
import { OsAPI, OsModel } from "../models/os.model";
import { OsTipoAtendimentoAPI, OsTipoAtendimentoModel } from "../models/os-tipo-atendimento.model";
import { UsuarioAPI, UsuarioModel } from "../models/usuario.model";
import { ClienteAPI, ClienteModel } from "../models/cliente.model";
import "../../shared/prototypes/string.prototype";
import "../../shared/prototypes/date.prototype";

@Injectable({
  providedIn: 'root'
})
export class OsService {
  constructor(private api: ApiHttpClient) {}

  public getByCodigo(codigo: number): Observable<OsModel> {
    return this.api.get<OsAPI>(`os/codigo/${codigo}`)
      .pipe(
        map(response => OsModel.fromJson(response)),
        catchError(err => throwError(() => Error(err.message)))
      );
  }

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

  public getOsSituacoes(): Observable<OsSituacaoModel[]> {
    return this.api.get<OsSituacaoAPI[]>("os-situacao")
      .pipe(
        map(response => response.map(e => OsSituacaoModel.fromJson(e))),
        catchError(err => throwError(() => Error(err.message)))
      );
  }

  public getOsTiposAtendimento(): Observable<OsTipoAtendimentoModel[]> {
    return this.api.get<OsTipoAtendimentoAPI[]>("os-tipo-atendimento")
      .pipe(
        map(response => response.map(e => OsTipoAtendimentoModel.fromJson(e))),
        catchError(err => throwError(() => Error(err.message)))
      );
  }

  public getUsuarios(): Observable<UsuarioModel[]> {
    return this.api.get<UsuarioAPI[]>("usuario")
      .pipe(
        map(response => response.map(e => UsuarioModel.fromJson(e))),
        catchError(err => throwError(() => Error(err.message)))
      );
  }

  public getClientesContainsName(name: string): Observable<ClienteModel[]> {
    return this.api.get<ClienteAPI[]>(`cliente/contains-name?name=${name}`)
      .pipe(
        map(response => response.map(e => ClienteModel.fromJson(e))),
        catchError(err => throwError(() => Error(err.message)))
      );
  }

  public save(model: OsModel): Observable<OsModel> {
    if (model.id == null) {
      return this.api.post<OsAPI>("os", model.toJson())
        .pipe(
          map(response => OsModel.fromJson(response)),
          catchError(err => throwError(() => Error(err.message)))
        );
    } else {
      return this.api.put<OsAPI>(`os/${model.id}`, model.toJson())
        .pipe(
          map(response => OsModel.fromJson(response)),
          catchError(err => throwError(() => Error(err.message)))
        );
    }
  }
}
