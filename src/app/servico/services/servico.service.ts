import { Injectable } from '@angular/core';
import { ApiHttpClient } from "../../shared/api/api-http-client";
import { catchError, map, Observable, throwError } from "rxjs";
import ServicoEntity from "../entities/servico.entity";
import ServicoModel from "../models/servico.model";

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  constructor(private api: ApiHttpClient) {}

  public getServicos(): Observable<ServicoEntity[]> {
    return this.api.get<ServicoModel[]>("servico")
      .pipe(
        map(response => response.map(e => ServicoEntity.fromModel(e))),
        catchError(err => throwError(() => Error(err.message)))
      );
  }
}
