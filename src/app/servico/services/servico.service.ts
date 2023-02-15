import { Injectable } from '@angular/core';
import { ApiHttpClient } from "../../shared/api/api-http-client";
import { catchError, map, Observable, throwError } from "rxjs";
import { ServicoAPI, ServicoModel } from "../../os/models/servico.model";

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  constructor(private api: ApiHttpClient) {}

  public getServicos(): Observable<ServicoModel[]> {
    return this.api.get<ServicoAPI[]>("servico")
      .pipe(
        map(response => response.map(e => ServicoModel.fromJson(e))),
        catchError(err => throwError(() => Error(err.message)))
      );
  }
}
