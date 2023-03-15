import { Injectable } from '@angular/core';
import { ApiHttpClient } from "../../shared/api/api-http-client";
import { HttpParams } from "@angular/common/http";
import { catchError, map, Observable, pipe, throwError } from "rxjs";
import { OsFilterParams, OsPaginatorParams } from "../params/os.params";
import "../../shared/prototypes/string.prototype";
import "../../shared/prototypes/date.prototype";
import OsEntity from "../entities/os.entity";
import OsModel from "../models/os.model";
import ClienteEntity from "../entities/cliente.entity";
import ClienteModel from "../models/cliente.model";
import UsuarioEntity from "../entities/usuario.entity";
import UsuarioModel from "../models/usuario.model";
import OsTipoAtendimentoModel from "../models/os-tipo-atendimento.model";
import OsTipoAtendimentoEntity from "../entities/os-tipo-atendimento.entity";
import OsSituacaoEntity from "../entities/os-situacao.entity";
import OsSituacaoModel from "../models/os-situacao.model";
import OsPaginatorModel from "../models/os-paginator.model";
import OsPaginatorEntity from "../entities/os-paginator.entity";

@Injectable({
  providedIn: 'root'
})
export class OsService {
  constructor(private api: ApiHttpClient) {}

  public getByCodigo(codigo: number): Observable<OsEntity> {
    return this.api.get<OsModel>(`os/codigo/${codigo}`)
      .pipe(
        map(response => OsEntity.fromModel(response)),
        catchError(err => throwError(() => Error(err.message)))
      );
  }

  public getAllWithPagination(paginatorParams: OsPaginatorParams, filterParams: OsFilterParams | null = null): Observable<OsPaginatorEntity> {
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

    return this.api.get<OsPaginatorModel>("os", httpParams)
      .pipe(
        map(response => OsPaginatorEntity.fromModel(response)),
        catchError(err => throwError(() => Error(err.message)))
      );
  }

  public getOsSituacoes(): Observable<OsSituacaoEntity[]> {
    return this.api.get<OsSituacaoModel[]>("os-situacao")
      .pipe(
        map(response => response.map(e => OsSituacaoEntity.fromModel(e))),
        catchError(err => throwError(() => Error(err.message)))
      );
  }

  public getOsTiposAtendimento(): Observable<OsTipoAtendimentoEntity[]> {
    return this.api.get<OsTipoAtendimentoModel[]>("os-tipo-atendimento")
      .pipe(
        map(response => response.map(e => OsTipoAtendimentoEntity.fromModel(e))),
        catchError(err => throwError(() => Error(err.message)))
      );
  }

  public getUsuarios(): Observable<UsuarioEntity[]> {
    return this.api.get<UsuarioModel[]>("usuario")
      .pipe(
        map(response => response.map(e => UsuarioEntity.fromModel(e))),
        catchError(err => throwError(() => Error(err.message)))
      );
  }

  public getClientesContainsName(name: string): Observable<ClienteEntity[]> {
    return this.api.get<ClienteModel[]>(`cliente/contains-name?name=${name}`)
      .pipe(
        map(response => response.map(e => ClienteEntity.fromModel(e))),
        catchError(err => throwError(() => Error(err.message)))
      );
  }

  public save(entity: OsEntity): Observable<OsEntity> {
    if (entity.id == null) {
      return this.api.post<OsModel>("os", entity.toModel())
        .pipe(
          map(response => OsEntity.fromModel(response)),
          catchError(err => throwError(() => Error(err.message)))
        );
    } else {
      return this.api.put<OsModel>(`os/${entity.id}`, entity.toModel())
        .pipe(
          map(response => OsEntity.fromModel(response)),
          catchError(err => throwError(() => Error(err.message)))
        );
    }
  }

  public excluir(entity: OsEntity): Observable<void> {
    return this.api.delete(`os/${entity.id}`)
      .pipe(
        map(() => void 0),
        catchError(err => throwError(() => Error(err.message)))
      );
  }
}
